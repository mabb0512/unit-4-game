$(document).ready(function() {

    var characters = {
        "char1": {
                    id: "char1",
                    name: "Captain America",
                    health: "120",
                    attack: "",
                    attackBack: "",
                    imgUrl:"assets/images/capt.jpg"
        },
        "char2": {
                    id: "char2",
                    name:"Hulk",
                    health: "100",
                    attack: "",
                    attackBack: "",
                    imgUrl:"assets/images/hulk.jpg"
        },
        "char3": {
                    id: "char3",
                    name:"Iron Man",
                    health: "150",
                    attack: "",
                    attackBack: "",
                    imgUrl:"assets/images/ironman.jpg"
        },
        "char4": {
                    id: "char4",
                    name: "Thor",
                    health: "180",
                    attack: "",
                    attackBack: "",
                    imgUrl:"assets/images/thor.jpg"
        }
    };

    var chosenAttacker = {};
    var chosenDefender = {};
    var chosen;

    //function to check if object is empty
    function isEmpty(obj) {
      for(var key in obj) {

          if(obj.hasOwnProperty(key))
              return false;
      }

      return true;
    }

    $(document).on("click", ".character", function() {

      if (isEmpty(chosenAttacker)) {

        //save chosen attacker
        chosen = $(this).attr('id');
        chosenAttacker = characters[chosen];

        //add chosen attacker to fight area
        var divAttacker = $("#attacker");
        var divCharacter = $("<div class='char-name'>").text(chosenAttacker.name);
        var divHealth = $("<div class='char-health'>").text(chosenAttacker.health);
        var image = $("<img src='" + chosenAttacker.imgUrl + "'>");

        divAttacker.append(divCharacter);
        divAttacker.append(image);
        divAttacker.append(divHealth);

        //hide chosen attacker
        $(this).empty();
        $("h1").text("Choose a defender:");
      }

      else if (isEmpty(chosenDefender)) {

        //save chosen defender
        chosen = $(this).attr('id');
        chosenDefender = characters[chosen];

        //add chosen defender to fight area
        var divDefender = $("#defender");
        var divCharacter = $("<div class='char-name'>").text(chosenDefender.name);
        var divHealth = $("<div class='char-health'>").text(chosenDefender.health);
        var image = $("<img src='" + chosenDefender.imgUrl + "'>");

        divDefender.append(divCharacter);
        divDefender.append(image);
        divDefender.append(divHealth);

        //hide remaining characters
        $("#characters").hide();
        $("h1").text("Time to fight!!");

      }
    });

  });
