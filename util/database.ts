import * as SQLite from 'expo-sqlite';


import { Record } from '../models/Record';

const database = SQLite.openDatabase('records.db');

export interface RecordProp {
    title: string;
    amount: string;
    date: string;
    id?: number;
  }
  

export function deleteTable() {
    const promise = new Promise<void>((resolve, reject) => {
        database.transaction((tx) => {
          tx.executeSql(
            `DROP TABLE records`,
            [],
            () => {
              resolve();
            },
            (_, error) => {
                reject(error);
                return false;
              }
            );
          });
        });
      
        return promise;
      }

export function init() {
    const promise = new Promise<void>((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS records (
                    title TEXT NOT NULL,
                    amount TEXT NOT NULL,
                    date TEXT NOT NULL,
                    id INTEGER PRIMARY KEY NOT NULL
                )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });

    return promise;
}


export function insertRecord(record: RecordProp) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO records (title, amount, date) VALUES (?, ?, ?)`,
                [
                    record.title,
                    record.amount,
                    record.date
                ],
                

                (_, result) => {
                    const id = result.insertId;
          const newRecord = { ...record, id };
          resolve(newRecord);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
            // console.log(record)
        });
    });
    return promise;
}

export function fetchRecords() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM records`,
                [],
                (_, result) => {
                    const records = [];

                    for (const dp of result.rows._array) {
                        records.push(
                            new Record(
                                dp.title,
                                dp.amount,
                                dp.date,
                                dp.id
                            )
                        );
                    }
                    resolve(records);

                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
    return promise;
}


export function deleteRecord(id: number) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM records WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });

    return promise;
}


export function fetchRecord(id: number) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM records WHERE id = ?`,
                [id],
                (_, result) => {
                    const record = result.rows._array[0];
                    resolve(record);
                    // console.log(record)
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
    return promise;
}

export function updateRecord(id: number, title: string, amount: string, date: string) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `UPDATE records 
                 SET title =  ?,
                    amount = ?,
                    date = ?
                    WHERE id = ?`,

                [title, amount, date, id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
    return promise;
}
