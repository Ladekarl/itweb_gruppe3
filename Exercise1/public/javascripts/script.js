$("#completedCheckbox").change(function () {
  $.ajax({
    type: "POST",
    url: "/" + this.parentElement.parentElement.firstChild.textContent + "/" + this.checked
  });
});