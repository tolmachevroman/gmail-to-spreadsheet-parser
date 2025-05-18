# Gmail to Google Spreadsheet parser automation

## ¿Qué es eso?
A veces surge la necesidad de procesar correos desde Gmail en el Google spreadsheet. Un buen ejemplo son correos del banco. Muchos bancos no cuentan con interfaz para ver tus gastos de forma ordenada para controlarlos (va contra todo el interés del banco obviamente), y uno tiene que inventar cómo visualizarlos, para luego construir gráficos, o comparar mes por mes, etc. Hay servicios pagados, gratuitos, pero todos involucran exportar y compartir tus datos privados con terceros.

La idea de ese repositorio es dar un ejemplo cortito de cómo se puede extraer datos de correos bancarios y visualizarlos en tu Google speadsheet personal. 

Estoy usando Banco BCI, que es mi caso personal, pero con un poco de debugging y ajustes debería funcionar con cualquier otro banco / correo.

## Paso por paso

#### 1. Vizualicemos la estructura del correo

<img width="1469" alt="Image" src="https://github.com/user-attachments/assets/6a942d57-4980-4fde-9893-cb09ec72453a" />

Mis correos bancarios tienen label "BCI". Cada correo contiene el título (`subject`) y contenido (`body`).

#### 2. Creamos un Spreadsheet personal

<img width="1840" alt="Image" src="https://github.com/user-attachments/assets/1faa0170-3eea-44de-8936-87b122c96317" />

<img width="1840" alt="Image" src="https://github.com/user-attachments/assets/4e2323f7-3441-42a2-add5-35a8a65d6409" />

Acá lo embellecí un poco. Agregué varios Sheets para meses individuales, uno para las categorias, y uno para ver el resumen de todos los meses.

#### 3. Agreguemos el script

<img width="1840" alt="Image" src="https://github.com/user-attachments/assets/8e11269c-0a09-43d7-8d78-33689bf4afbd" />

En el Spreadsheet, pincha `Extensions` -> `Apps Script`. Luego, copia y pega el script del repositorio.

<img width="1840" alt="Image" src="https://github.com/user-attachments/assets/8cd5f780-83b2-4e3b-8a33-14d30a4d2f72" />

#### 4. Ejecutemos el script

Ahora, solo pincha Run, espera que termine y confirma que los datos aparecieron en la hoja indicada, para el mes indicado.

<img width="1840" alt="Image" src="https://github.com/user-attachments/assets/0a2a5e54-db0f-4f9f-ab43-5de0eefa4e47" />

#### 5. Modificando el script

Como puedes ver, el script corre para mes y año que eliges. Lo mismo con la hoja activa, la tienes que indicar manualmente también. Lo demás es automático!
