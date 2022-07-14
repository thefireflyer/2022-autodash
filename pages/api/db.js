import { Database } from "sqlite3";

const user_table = "users"

function init() {
    const db = new Database("userdata.db");
    db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS ${user_table} (
            id TEXT PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            test_value INTEGER DEFAULT 0
        )`);
    })

    return db
}

function getCurrentData(db, callback)
{
    let userData = []
    db.serialize(() => {
            db.each(`SELECT id, email, test_value FROM ${user_table}`, (err, row) => {
                console.log(`${row.id}: ${row.email} #${row.test_value}`);
                userData.push({
                    id: row.id,
                    email: row.email,
                    testValue: row.test_value
                })
            }, () => {callback(userData)});
        });
}

function addUser(db, id, email, testValue)
{
    db.run(`INSERT INTO ${user_table} (id, email)
    VALUES ("${id}", "${email}")`)
}

function updateUserData(db, id, newEmail, newTestValue)
{
    db.run(`UPDATE ${user_table}
    SET email = ${newEmail.replace("@", "")},
        test_value = ${newTestValue}
    WHERE
        id = "${id}"`)
}

function deleteUser(db, id)
{
    db.run(`DELETE FROM ${user_table}
    WHERE id = "${id}";
    `)
}


export default async function db(req, res) {
    try {
        const db = await init()

        switch (req?.headers?.action) {
            case `add`:
                await addUser(db, req.headers.id, req.headers.email, req.headers.testValue)
                break;
        
            case `update`:
                await updateUserData(db, req.headers.id, req.headers.email, req.headers.testValue)
                break;

            case `remove`:
                await deleteUser(db, req.headers.id)
                break;

            default:
                break;
        }

        await getCurrentData(db, userData => {
                    console.log(userData);
                    res.status(200).json({ users: userData });
                })
        await db.close()
        

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}