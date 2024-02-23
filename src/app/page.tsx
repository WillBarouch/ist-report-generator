
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const Page = () => {
    const [filesData, setFilesData] = useState([]);

    const onFileChange = (event:any) => {
        const files = event?.target.files;
        for (let i = 0; i < files.length; i++) {
            Papa.parse(files[i], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray: any[] = [];
                    const valuesArray: unknown[][] = [];

                    // Iterating data to get column name and their values
                    results.data.map((d) => {
                        // @ts-ignore
                        rowsArray.push(Object.keys(d));
                        // @ts-ignore
                        valuesArray.push(Object.values(d));
                    });

                    // Create an object for the file
                    const fileData = {
                        parsedData: results.data,
                        tableRows: rowsArray[0],
                        values: valuesArray,
                    };

                    // Add the file's data to the state
                    // @ts-ignore
                    setFilesData(prevData => [...prevData, fileData]);
                },
            });
        }
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <main className={"bg-gray-200 min-w-full min-h-screen p-16 text-gray-800 flex flex-col items-center align-middle"}>
            <h1 className="text-4xl font-bold mb-4">CSV File Parser</h1>
            {filesData.length==0 && <form>
                <input type="file" name="file" onChange={onFileChange} accept={".csv"} multiple/>
            </form>}
            {filesData.map((fileData, index) => (
                <table key={index} className="table-auto bg-gray-200 rounded-xl text-gray-800 overflow-clip m-8">
                    <thead>
                    <tr>
                        {fileData.tableRows.map((header:string, index:number) => (
                            <th key={index} className="px-4 py-2 bg-gray-300">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {fileData.values.map((row:string, index:number) => (
                        <tr key={index}>
                            {Object.values(row).map((value: any, index) => (
                                <td key={index} className="border px-4 py-2 bg-gray-100">{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            ))}
        </main>
    );
};

export default Page;