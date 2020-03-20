// 2C -> 2 of clubs
// 2D -> 2  of diamonds
// 2H -> 2 of hearts
// 2S -> 2 of spades

(() => {
  "use strict"; // nos permite 'limpiar' errores comunes. Se recomienda habilitarlo siempre.

  let deck = [];
  const palos = ["C", "D", "H", "S"];
  const especiales = ["J", "Q", "K", "A"];

  let puntosJugador = 0;
  let puntosComputadora = 0;

  // Referencias del HTML
  const playerPoints = document.getElementById("player__points");
  const computerPoints = document.getElementById("computer__points");

  const modal = document.getElementById("modal");

  let element = document.getElementById("message");
  const message = element.textContent;

  const btnPedirCarta = document.getElementById("another-card");
  const btnNuevoJuego = document.getElementById("new-game");
  const btnDetenerJuego = document.getElementById("game-save");

  const cartasJugador = document.getElementById("player__cards");
  const cartasComputadora = document.getElementById("computer__cards");

  const quitarModal = status => {
    modal.style.display = status;
  };
  // quitarModal("block");
  quitarModal("none");

  // Crea un nuevo deck
  const crearDeck = () => {
    for (let index = 2; index <= 10; index++) {
      for (let palo of palos) {
        deck.push(index + palo);
      }
    }

    for (let palo of palos) {
      for (let especial of especiales) {
        deck.push(especial + palo);
      }
    }

    //   console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck); //Ya 'suffleado'
    return deck;
  };

  crearDeck(deck);

  // Tomar una carta del deck

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    let carta = deck.pop();
    return carta;
  };

  // Obtener valor de carta
  const valorCarta = carta => {
    let valorCarta = carta.length === 2 ? carta[0] : carta[0] + carta[1];

    return isNaN(valorCarta)
      ? valorCarta === "A"
        ? 11
        : 10 //Letra
      : valorCarta * 1; //Número
  };

  // Eventos
  const turnoComputadora = puntosMinimo => {
    do {
      const carta = pedirCarta();
      puntosComputadora = puntosComputadora + valorCarta(carta);
      computerPoints.innerText = puntosComputadora;

      const imgCarta = document.createElement("img");
      imgCarta.src = `./assets/cartas/${carta}.png`;
      cartasComputadora.append(imgCarta);
      imgCarta.classList.add("computer__card");

      if (puntosMinimo > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimo && puntosMinimo <= 21);

    setTimeout(() => {
      if (puntosComputadora === puntosMinimo) {
        quitarModal("block");
        element.textContent = "Empate";
      } else if (puntosMinimo > 21) {
        quitarModal("block");
        element.textContent = "Computadora gana";
        element.classList.add = "modal";

        // alert("La computadora gana");
      } else if (puntosComputadora > 21) {
        quitarModal("block");
        // alert("Jugador gana");
        element.textContent = "Jugador gana";
        element.classList.add = "modal";
      } else {
        quitarModal("block");
        element.textContent = "Computadora gana";
        element.classList.add = "modal";
        // alert("Compudora gana");
      }
    }, 50);
  };

  // Turno jugador
  btnPedirCarta.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    playerPoints.innerText = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${carta}.png`;
    cartasJugador.append(imgCarta);
    imgCarta.classList.add("player__card");

    if (puntosJugador > 21) {
      quitarModal("block");
        element.textContent = "Computadora gana";
      btnPedirCarta.disabled = true;
      btnDetenerJuego.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      quitarModal("block");
        element.textContent = "21, ¡Genial!";
      btnDetenerJuego.disabled = true;
      btnPedirCarta.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetenerJuego.addEventListener("click", () => {
    btnPedirCarta.disabled = true;
    btnDetenerJuego.disabled = true;

    turnoComputadora(puntosJugador);
  });

  // NUevo juego
  btnNuevoJuego.addEventListener("click", () => {
    window.location.reload(false);
  });
})();
