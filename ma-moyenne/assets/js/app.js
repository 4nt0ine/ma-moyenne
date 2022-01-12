// partie Baptiste

function addNote() {
  var verifNote;
  var nbVerif = 0;
  var verifMat;
  var verifDate;
  var veriCoef;
  var noteMemory = [];
  var coefMemory = [];
  var matMemory = [];
  var dateMemory = [];
  var numTabforNotes = 1;
  $(".js-nb-note").text("Note n°" + numTabforNotes);
  $(".add-note").click(function () {
    verifNote = $(".note").val();
    verifMat = $(".mat").val();
    verifDate = $(".date-form").val();
    nbVerif = 0;

    veriCoef = $(".coef-range").val();

    if (verifNote == "" || verifNote > 20 || verifNote < 0) {
      $(".error-note").removeClass("d-none");
      nbVerif += 1;
    } else {
      $(".error-note").addClass("d-none");
    }

    if (verifMat == "") {
      $(".error-mat").removeClass("d-none");
      nbVerif += 1;
    } else {
      $(".error-mat").addClass("d-none");
    }

    if (verifDate == "") {
      $(".error-date").removeClass("d-none");
      nbVerif += 1;
    } else {
      $(".error-date").addClass("d-none");
    }

    if (nbVerif == 0) {
      $(".num-tab").append('<td class="add-num addtab"></td>');
      $(".add-num:last-child").text(numTabforNotes);

      numTabforNotes += 1;

      $(".note-tab").append('<td class="add-note-for-tab addtab"></td>');
      $(".add-note-for-tab:last-child").text(verifNote);

      $(".coef-tab").append('<td class="add-coef-for-tab addtab"></td>');
      $(".add-coef-for-tab:last-child").text(veriCoef);

      $(".mat-tab").append('<td class="add-mat-for-tab addtab"></td>');
      $(".add-mat-for-tab:last-child").text(verifMat);

      $(".date-tab").append('<td class="add-date-for-tab addtab"></td>');
      $(".add-date-for-tab:last-child").text(verifDate);

      // $('.form-moyenne').prepend('<div class="div-form-note"><form method="post" class="form-note"><p class="js-nb-note"></p><label>Note :<input class="note"></label><p class="d-none error error-note">Note invalide ( Saisir une note entre 0 et 20 )</p><label class="coef">Coeficient :<input type="range" min="0" max="3" step="0.5" class="coef-range" value="1"><p class="result-coef"></p></label><select class="mat"><option value="">-- Choisissez une matière --</option><option value="Mathématiques">Mathématiques</option><option value="Francais">Francais</option><option value="Anglais">Anglais</option><option value="Histoire-Géographie">Histoire-Géographie</option><option value="Physique-Chimie">Physique-Chimie</option><option value="SVT">SVT</option><option value="autre">autre</option></select><p class="d-none error error-mat">Champ invalide ( Veuillez spécifier votre matière )</p><label class="date">Date :<input type="date" class="date"><p class="d-none error error-date">Date non valide ( Veuillez spécifier une date )</p></label><label class="d-none other-mat">Autre :<input name="submitted-name" autocomplete="name"></label></form><div class="div-btn"><button class="add-note btn">Ajouter</button></div></div></div>')

      $(".js-nb-note").text("Note n°" + numTabforNotes);

      noteMemory.push(verifNote);
      coefMemory.push(veriCoef);
      matMemory.push(verifMat);
      dateMemory.push(verifDate);
    }
  });

  $(".return-btn").click(function () {
    $(".addtab:last-child").remove();
    if (numTabforNotes >= 2) {
      numTabforNotes -= 1;
      $(".js-nb-note").text("Note n°" + numTabforNotes);
      noteMemory.pop();
      coefMemory.pop();
      matMemory.pop();
      dateMemory.pop();
    }
  });

  var genMoy;
  var ecartGen;
  var genMoyCoef;
  var matMoy;
  var frMoy;
  var histMoy;
  var angMoy;
  var phyMoy;
  var svtMoy;

  $(".val-btn").click(function () {
    if (numTabforNotes != 1) {
      genMoy = 0;
      genMoyCoef = 0;
      for (let x = 0; x < noteMemory.length; x++) {
        genMoy += parseInt(noteMemory[x]) * parseInt(coefMemory[x]);
        genMoyCoef += parseInt(coefMemory[x]);
      }

      genMoy /= genMoyCoef;
      console.log(genMoy);

      ecartGen = 0;

      for (let x = 0; x < noteMemory.length; x++) {
        ecartGen +=
          (parseInt(noteMemory[x]) - genMoy) ** 2 * parseInt(coefMemory[x]);
      }

      ecartGen /= genMoyCoef;

      ecartGen = Math.sqrt(ecartGen);

      console.log(ecartGen);
    }
  });

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function coefForm() {
  var valCoef;
  $(".coef").mousemove(function () {
    valCoef = $(".coef-range").val();

    $(".result-coef").text(valCoef);
  });
}

$(function () {
  console.log("js actif");

  addNote();
  coefForm();
  deleteButton();
});
