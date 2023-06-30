for (let index = 0; index < 50; index++) {

    const body = { 
        "projectId": Math.round(Math.random() * 10) % 2 ? "6096368d8587d16fd511e290" : "60ecf7d11360a97e21741044",
        "topic": Math.random().toString(36).slice(2),
        "availability": { "start": "2022-12-21T09:16:00.000Z", "end": "2022-12-22T09:16:00.000Z", "always": false },
        "limit": { "callDuration": 0, "usageLimit": 0 },
        "permission": { "control": { "manualDrive": true, "screenControl": true, "locations": { "enabled": true, "all": true, "list": [] } }, "edit-settings": { "addNotes": true } }
    }
    fetch("https://api.dev.temi.cloud/api/v2/telepresence/link/admin/create", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,en-US;q=0.6",
            "access-control-allow-credentials": "true",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "region": "virginia",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-temi-organization-id": "578055b3ca95cc067ab9b6ee73c8950a",
            "Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MTUyNDcsImRhdGEiOnsiY2xpZW50SWQiOiI1NzgwNTViM2NhOTVjYzA2N2FiOWI2ZWU3M2M4OTUwYSIsInJvbGUiOiJXRUJQTEFURk9STSIsImFjY2VzcyI6IkFDVElWRSIsImluZm8iOnsiZW1haWwiOiIiLCJ1c2VybmFtZSI6InFxIiwicHJvZmlsZV9pbWFnZSI6IiIsInN0b3JhZ2VDYXBhY2l0eSI6NTAwMDAwMDAwMH0sInV1aWQiOiI1M2UyYmE3YS1kZDRlLTQ3ZjgtYjhjYy1kZTViOWM0NThhMTAiLCJyZWZyZXNoQ291bnRlciI6NzV9LCJpc3MiOiJURU1JX1NFUlZFUiIsImF1ZCI6IldFQlBMQVRGT1JNIiwiZXhwIjoxNjcxNjE4ODQ3fQ.cweU-uwwMBMCwbx7g0eV8pFBqNbh4_g_h_RqjZSzuEylsPL6Anakf5fXocvRRojiHs9rYk_pUGNJ62qWCw8OrvjEx4HvBeggy4QJHDD2w4xDBkwZiy2osR_7fs0lpIYmiLA3pY5QL3TZGxZ0EEm6sBdczh_CjMFREaPbnao0CHKTXTl69rZ74DpCBsE67VBjIGSw-4NSr9hlqQ5wqZWl49XulGJS03Cht5GvSQGb8dsZDHl7cH3FIaYm1Qu8LWzG_dcS2SYBeW5Borft9EorfvJ9Hez5BUFKftDy2d-lg3ZZD8ozZT5rUSl5hEqfem0Z08iPCOe2rOtD1GkeqoXmESOHpN16N4AVxAT7_2WjV1_svnsI3oDt_R--WwhBPkq0ot2hesOj-USPt8Kit6JfhO7Dg7YLpY7S66_-vJLkEa_tHMILH940OzGzhS7_eITA7f1vXfYtBp6nuVq5sBL-XYrgwxjbngYBVzSYdhHwpFyCkFOxZ93FMN9979sJY5KOeebShxRoRsXmhXIWgntZAQO0H9luSz3bXZF-qb3Vb50oVS_F-0FH0HWf38wNtsqgD6hYfKyWcL_W9140iaeihnIOgGYiIpoF148YzBYGPfIQy2-9JTD17zHjorvNlmnEqzMZHuwHq0weFhmVxHZDHbkVfjDICu1Uif-mFMEKXRk"
        },
        "referrer": "https://localhost:9191/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify(body),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}