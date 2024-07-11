// function toggleList() {
//     document.getElementById("myDropdown").classList.toggle("show");
//     console.log("clicked")
// }

function toggleCategory() {
  document.getElementById("categoryDropdown").classList.toggle("show");
}

function toggleGlass() {
  document.getElementById("glassDropdown").classList.toggle("show");
}

function toggleIngredient() {
  document.getElementById("ingredientDropdown").classList.toggle("show");
}

function toggleAlcohol() {
  document.getElementById("alcoholDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("filter-input");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
}