
var characterSelected = false;
var defenderSelected = false;
var character = {};
var defender = {};
var enemiesDefeated = 0;
gameOver = false;

var obiWanKenobi = {
    name: "Obi-Wan Kenobi",
    health: 120,
    baseAttack: 8,
    attack: 8
};

var lukeSkywalker = {
    name: "Luke Skywalker",
    health: 100,
    baseAttack: 5,
    attack: 5
};

var darthSidious = {
    name: "Darth Sidious",
    health: 150,
    baseAttack: 20,
    attack: 20
};

var darthMaul = {
    name: "Darth Maul",
    health: 180,
    baseAttack: 25,
    attack: 25
};

function initializeCharacter(chosenCharacter) {
    character.name = chosenCharacter.name;
    character.health = chosenCharacter.health;
    character.baseAttack = chosenCharacter.baseAttack;
    character.attack = chosenCharacter.attack;
}

function initializeDefender(chosenDefender) {
    defender.name = chosenDefender.name;
    defender.health = chosenDefender.health;
    defender.baseAttack = chosenDefender.baseAttack;
    defender.attack = chosenDefender.attack;
}

function moveToEnemies() {
    $(".availableCharacter").removeClass("availableCharacter").addClass("enemyCharacter");
    $("#enemies").append($(".enemyCharacter"));
}

function resetGame() {
    $("#owkTotalText").children(".health").html(obiWanKenobi.health);
    $("#lsTotalText").children(".health").html(lukeSkywalker.health);
    $("#dsTotalText").children(".health").html(darthSidious.health);
    $("#dmTotalText").children(".health").html(darthMaul.health);

    $(".characterImage").removeClass("chosenCharacter enemyCharacter defenderCharacter").addClass("availableCharacter");
    var available = $(".availableCharacter").show();
    $("#characters").html(available);

    $("#gameStatus").empty();
    $("#restart").hide();

    characterSelected = false;
    defenderSelected = false;
    enemiesDefeated = 0;
    gameOver = false;

    character = {};
    defender = {};
}

$(document).ready(function() {

    $("#restart").hide();

    $("#owkTotalText").on("click", function () {

        if(characterSelected == false)
        {

            $("#gameStatus").empty();
            initializeCharacter(obiWanKenobi);
            characterSelected = true;


            $("#owkTotalText").removeClass("availableCharacter").addClass("chosenCharacter");
            $("#pickedCharacter").append(this);

            moveToEnemies();
        }

        else if ((characterSelected == true) && (defenderSelected == false))

        {

            if($("#owkTotalText").hasClass("enemyCharacter"))

            {
                $("#gameStatus").empty();

                initializeDefender(obiWanKenobi);
                defenderSelected = true;

                $("#owkTotalText").removeClass("enemyCharacter").addClass("defenderCharacter");
                $("#defender").append(this);
            }
        }
    });

    $("#lsTotalText").on("click", function () {

        if(characterSelected == false)
        {
            $("#gameStatus").empty();

            initializeCharacter(lukeSkywalker);
            characterSelected = true;

            $("#lsTotalText").removeClass("availableCharacter").addClass("chosenCharacter");
            $("#pickedCharacter").append(this);

            moveToEnemies();
        }

        else if ((characterSelected == true) && (defenderSelected == false))

        {
            if($("#lsTotalText").hasClass("enemyCharacter"))

            {

                $("#gameStatus").empty();
                initializeDefender(lukeSkywalker);
                defenderSelected = true;

                $("#lsTotalText").removeClass("enemyCharacter").addClass("defenderCharacter");
                $("#defender").append(this);
            }
        }
    });

    $("#dsTotalText").on("click", function () {

        if(characterSelected == false)
        {
            $("#gameStatus").empty();

            initializeCharacter(darthSidious);
            characterSelected = true;

            $("#dsTotalText").removeClass("availableCharacter").addClass("chosenCharacter");
            $("#pickedCharacter").append(this);

            moveToEnemies();
        }

        else if ((characterSelected == true) && (defenderSelected == false))
        {

            if($("#dsTotalText").hasClass("enemyCharacter")) {
                $("#gameStatus").empty();

                initializeDefender(darthSidious);
                defenderSelected = true;

                $("#dsTotalText").removeClass("enemyCharacter").addClass("defenderCharacter");
                $("#defender").append(this);
            }
        }
    });

    $("#dmTotalText").on("click", function () {

        if(characterSelected == false)
        {
            $("#gameStatus").empty();

            initializeCharacter(darthMaul);
            characterSelected = true;

            $("#dmTotalText").removeClass("availableCharacter").addClass("chosenCharacter");
            $("#pickedCharacter").append(this);

            moveToEnemies();
        }

        else if ((characterSelected == true) && (defenderSelected == false))
        {

            if($("#dmTotalText").hasClass("enemyCharacter")) {
                $("#gameStatus").empty();

                initializeDefender(darthMaul);
                defenderSelected = true;

                $("#dmTotalText").removeClass("enemyCharacter").addClass("defenderCharacter");
                $("#defender").append(this);
            }
        }
    });

    $("#attack").on("click", function() {

        if (characterSelected && defenderSelected && !gameOver) {

            defender.health = defender.health - character.attack;
            $(".defenderCharacter").children(".health").html(defender.health);
            $("#gameStatus").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.<p>");


            character.attack = character.attack + character.baseAttack;


            if (defender.health > 0) {
                character.health = character.health - defender.baseAttack;
                $(".chosenCharacter").children(".health").html(character.health);

                if (character.health > 0) {

                    $("#gameStatus").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
                }

                else {
                    gameOver = true;
                    $("#gameStatus").html("<p>You were defeated! </p><p>Play again?</p>");
                    $("#restart").show();
                }
            }

            else {
                enemiesDefeated++;
                defenderSelected = false;
                $("#gameStatus").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
                $(".defender-character").hide();

                if (enemiesDefeated === 3) {
                    gameOver = true;
                    $("#gameStatus").html("<p>You Win!</p><p>Play again?</p>");
                    $("#restart").show();
                }
            }
        }

        else if (!characterSelected && !gameOver)
        {

            $("#gameStatus").html("<p>You must first select your game character.</p>");

        }

        else if (!defenderSelected && !gameOver)
        {

            $("#gameStatus").html("<p>You must choose an enemy to fight.</p>");

        }

    });

    $("#restart").on("click", function()

    {
        console.log("Restart selected");

        resetGame();
    });

});