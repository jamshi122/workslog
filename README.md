# Works Log: your own copy (iPhone only, no Mac, no App Store)

You will put these files on a free web address (GitHub Pages), then add it to your Home Screen.
All of this can be done in Safari on your iPhone.

## 1. Put the files online (about 10 minutes)
1. In Safari go to github.com and create a free account.
2. Tap the + (top right), then **New repository**.
   Name: `workslog`. Choose **Public** (free Pages needs Public). Tap **Create repository**.
3. On the new repository page tap **uploading an existing file** (or Add file > Upload files).
4. Choose these 7 files from this folder in the Files app and upload them:
   index.html, sw.js, manifest.webmanifest, icon-192.png, icon-512.png, apple-touch-icon.png,
   google-apps-script.gs. Tap **Commit changes**.
   Do NOT upload works-history-backup.json (that is your personal data).
5. Open **Settings** > **Pages**. Under Source choose **Deploy from a branch**, branch **main**,
   folder **/ (root)**, tap **Save**. (If you cannot find Settings, tap aA in Safari and choose Request Desktop Website.)
6. Wait 1 to 2 minutes. Your address will be: `https://YOURNAME.github.io/workslog/`

## 2. Install on your iPhone
1. Open that address in **Safari**.
2. Tap **Share**, then **Add to Home Screen**, then **Add**.
3. From now on open Works Log from the Home Screen icon. It runs full screen and works offline.

## 3. Bring in your old works (one time)
Keep `works-history-backup.json` in the Files app (iCloud Drive).
In Works Log: **Data** > **Restore backup** > choose that file. Your 1,472 works appear.

## Your data
- It is stored in the app's own private database on your iPhone. It is separate from Safari history.
- Deleting the Home Screen icon deletes the data. Keep a copy: **Data > Download full backup** saves a file to Files.
- Public repository means anyone can see the app's code and the flight and registration lists.
  Your works are never uploaded. They stay on your phone (and your Google Sheet if you turn that on).

## Optional: Google Sheets backup
1. Create a Google Sheet. Extensions > Apps Script. Paste the contents of `google-apps-script.gs`.
2. Deploy > New deployment > Web app. Execute as **Me**, access **Anyone**. Copy the URL ending in `/exec`.
3. In Works Log: Data > Google Sheets backup > paste the URL > Save and sync now.

## Updating the app
Upload the new `index.html` to the repository (it replaces the old one). Open the app twice to get the new version.

Works Log, (c) Jamshi Solutions. Contact: Jamshi285@gmail.com
