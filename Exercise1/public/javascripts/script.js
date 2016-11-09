$(".completed-checkbox").change(function () {
  $.ajax({
    type: "POST",
    url: "/trainingProgram/new/" + this.parentElement.parentElement.firstChild.textContent + "/" + this.checked
  });
});