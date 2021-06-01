document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: calculatePlaylistLength,
  });
});

function calculatePlaylistLength(){

  let arr = []

  document.querySelectorAll(".ytd-thumbnail-overlay-time-status-renderer").forEach( item => {
    arr.push((item.innerHTML).toString())
  })

  arr = arr.filter(line => line !== "")
  arr = arr.map(str => str.substr(3))
  arr = arr.map(str => str.slice(0, -1))
  
  arr = arr.map( str => str.split(":") )  
  arr = arr.map(time => parseInt(time[0]) * 60 + parseInt(time[1]) )
  
  let sum = arr.reduce((total, item) => total + item)
  
  alert(`Total: ${Math.floor(sum / 3600)}h ${Math.floor((sum % 3600) / 60)}m ${sum % 60}s`)
}
