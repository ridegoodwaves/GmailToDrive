function processIncomingEmail() {
  // Get the email address associated with the script from script properties
  var emailAddress = PropertiesService.getScriptProperties().getProperty("EMAIL_ADDRESS");

  // Specify the Gmail search query to filter the emails
  var searchQuery = "to:" + emailAddress + " has:attachment is:unread subject:2024";

  // Specify the Google Drive folder where you want to store the attachments
  var targetFolderName = "2024 Documents";

  // Get the target folder in Google Drive
  var targetFolder = getOrCreateFolder(targetFolderName);

  // Get all the emails matching the search query
  var threads = GmailApp.search(searchQuery);

  // Iterate through the threads (emails) and process the attachments
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();

    // Iterate through the messages (individual emails) in the thread
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var attachments = message.getAttachments();

      // Iterate through the attachments and save them to the target folder
      for (var k = 0; k < attachments.length; k++) {
        var attachment = attachments[k];
        var file = targetFolder.createFile(attachment);
        Logger.log("Saved attachment: " + file.getName());
      }

      // Mark the email as read
      message.markRead();
    }
  }
}

// Helper function to get or create a folder in Google Drive
function getOrCreateFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  var folder;

  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(folderName);
  }

  return folder;
}
