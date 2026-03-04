const XLSX = require('xlsx');
const path = require('path');

const filePath = 'c:\\Users\\paulo\\Desktop\\Arquivos\\faculdade\\fitoclin\\Formulário Pré-consulta para atendimento de Fitoterapia Clínica Dra. ISA (respostas).xlsx';

const fs = require('fs');

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    let output = '';
    if (data.length > 0) {
        const headers = data[0];
        output += '--- HEADERS START ---\n';
        headers.forEach((h, i) => {
            output += `${i}: ${h}\n`;
        });
        output += '--- HEADERS END ---\n';

        if (data.length > 1) {
            output += '--- SAMPLE ROW ---\n';
            output += JSON.stringify(data[1], null, 2) + '\n';
        }
    } else {
        output = 'No data found in sheet.';
    }
    fs.writeFileSync('xlsx_results.txt', output);
    console.log('Analysis written to xlsx_results.txt');
} catch (error) {
    console.error('Error reading XLSX:', error.message);
}
