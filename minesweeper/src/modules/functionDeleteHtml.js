export default function deleteHtml() {
  const container = document.querySelector('.container');
  container.remove();
  const settings = document.querySelector('.settings');
  settings.remove();
  const messageWin = document.querySelector('.message-win');
  messageWin.remove();
  const messageLose = document.querySelector('.message-lose');
  messageLose.remove();
  const listContainer = document.querySelector('.list-container');
  listContainer.remove();
}
