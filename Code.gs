function processEmailsForMonth() {
  const year = 2025;
  const nextYear = 2025;

  const month = 4;
  const nextMonth = 5;

  const query = `label:BCI after:${year}-${String(month).padStart(2, '0')}-01 before:${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;
  const threads = GmailApp.search(query);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 1); // first day of next month

  let row = 2;

  let total = 0;

  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      const date = message.getDate();

      if (date < startOfMonth || date >= endOfMonth) return;

      if (message.getSubject().includes("Notificación de uso de tu tarjeta")) {
        const body = message.getPlainBody(); // or use getBody() for HTML
        // console.log(body);
        const cardType = parseCardType(body);
        const {formatted, value} = parseAmount(body);
        const merchant = parseMerchant(body);

        total += value;

        // Append to sheet
        sheet.getRange(row, 1, 1, 3).setValues([[date, formatted, merchant]]);
        sheet.getRange(row,5,1,1).setValue("Spent");
        row++;
      }

    });
  });

  sheet.getRange(row + 1, 2, 1, 1).setValues([["CLP $" + total.toFixed(2)]]);

}

function parseCardType(body) {
  const cardTypeMatch = body.match(/Notificación uso (TDC|TDD)/);
  let cardType = "Not found";
  if (cardTypeMatch) {
    cardType = cardTypeMatch[1] === "TDC" ? "crédito" : "débito";
  }
  return cardType;
}

function parseAmount(body) {
  const amountCLP = body.match(/Monto\s+\$([\d.]+)/);
  const amountUSD = body.match(/Monto\s+USD\s+([\d,]+)/);

  if (amountCLP) {
    const str = `CLP $${amountCLP[1]}`; // e.g., "CLP $38.780"
    const num = parseFloat(amountCLP[1].replace(/\./g, "")); // Convert "38.780" to 38780 (assuming dot is thousand separator)
    return { formatted: str, value: num };
  } else if (amountUSD) {
    const usdFormatted = amountUSD[1].replace(",", ".");
    const str = `USD $${usdFormatted}`; // e.g., "USD $0.84"
    const num = parseFloat(usdFormatted) * 980; // approx. CLP vs USD conversion
    return { formatted: str, value: num };
  } else {
    return { formatted: "", value: 0 };
  }
}

function parseMerchant(body) {
  const merchantMatch = body.match(/Comercio\s+([^\n]+)/);
  return merchantMatch ? merchantMatch[1] : "Not found";
}


