// Ready translated locale messages
const messages = {
  en: {
    myAccount: "My account",
    signin: "Sign in",
    signup: "Sign up",
    logout: "logout",
    enterEmail: "Enter email",
    password: "Password:",
    enterPassword: "Enter password",
    signupTitle: "Create your personal account",
    firstName: "First name:",
    enterFirstName: "Enter first name",
    lastName: "Last name:",
    enterLastName: "Enter last name",
    chooseStatus: "Choose your status:",
    player: "Player",
    banker: "Banker",
    chooseTeam: "Choose your team:",
    createTeam: "Create your team:",
    enterTeam: "Enter a team name",
    submit: "Submit",
    cancel: "Cancel",
    optionsRadio: [
      { text: "Player", value: "first" },
      { text: "Banker", value: "second" }
    ],
    barSearch: "Type to search",
    clear: "Clear",
    perPage: "Per page",
    fieldsPlayer: [
      { key: "first_name", label: "Player" },
      { key: "total", label: "Total" },
      { key: "actions", label: "Actions" }
    ],
    addFine: "Add fine",
    history: "History",
    paidFine: "Fine paid",
    payment: "Payment",
    fine: "Fine :",
    isPaid: "Are you sure {player} paid ?",
    sendBills: "Send bills",
    confirmationBills: "Do you really want to send bills ?",
    yes: "Yes",
    no: "No",
    fieldsFines: [
      {
        key: "label",
        label: "Label",
        sortable: true,
        sortDirection: "desc"
      },
      {
        key: "cost",
        label: "Cost",
        sortable: true,
        sortDirection: "desc"
      },
      { key: "actions", label: "Actions" }
    ],
    updateFine: "Modify fine",
    deleteFine: "Delete fine",
    labelFine: "Label :",
    costFine: "Cost :",
    enterLabelFine: "Enter label",
    enterCostFine: "Enter cost",
    isDeleted: "Are you sur to delete {fine} ?",
    links: [
      {
        id: 0,
        text: "Statistic",
        page: "/statistic"
      },
      {
        id: 1,
        text: "Players",
        page: "/players"
      },
      {
        id: 2,
        text: "Fines",
        page: "/fines"
      }
    ],
    bestContributor: "{first_name} {last_name} with {total} €",
    mostRecurrentFine: "{total} with {label} recurrences",
    bestContributorTitle: "Top contributor",
    mostRecurrentFineTitle: "Most recurrent fine",
    errorMessageLogin: "Wrong email or password"
  },
  fr: {
    myAccount: "Mon compte",
    signin: "Se connecter",
    signup: "S'inscrire",
    logout: "Déconnexion",
    enterEmail: "Entre ton email",
    password: "Mot de passe:",
    enterPassword: "Entre ton mot de passe",
    signupTitle: "Crées ton compte personnel",
    firstName: "Prénom:",
    enterFirstName: "Entre ton prénom",
    lastName: "Nom:",
    enterLastName: "Entre ton nom",
    chooseStatus: "Choisis ton statut:",
    player: "Joueur",
    banker: "Banquier",
    chooseTeam: "Choisis ton équipe:",
    createTeam: "Crées ton équipe:",
    enterTeam: "Entre un nom d'équipe",
    submit: "Valider",
    cancel: "Annuler",
    optionsRadio: [
      { text: "Joueur", value: "first" },
      { text: "Banquier", value: "second" }
    ],
    barSearch: "Tapez pour rechercher",
    clear: "Effacer",
    perPage: "Par page",
    fieldsPlayer: [
      { key: "first_name", label: "Joueur" },
      { key: "total", label: "Somme à payer" },
      { key: "actions", label: "Actions" }
    ],
    addFine: "Ajouter une amende",
    history: "Historique",
    paidFine: "Amende payée",
    payment: "Paiement",
    fine: "Amende :",
    isPaid: "Es tu sûr que {player} a payé ?",
    sendBills: "Envoyer la facture",
    confirmationBills:
      "Veux tu vraiment envoyer la facture à tous tes joueurs ?",
    yes: "Oui",
    no: "Non",
    fieldsFines: [
      {
        key: "label",
        label: "Label",
        sortable: true,
        sortDirection: "desc"
      },
      {
        key: "cost",
        label: "Coût",
        sortable: true,
        sortDirection: "desc"
      },
      { key: "actions", label: "Actions" }
    ],
    updateFine: "Modifier l'amende",
    deleteFine: "Supprimer l'amende",
    labelFine: "Label :",
    costFine: "Coût :",
    enterLabelFine: "Entrer le label",
    enterCostFine: "Entrer la valeur",
    isDeleted: "Es tu sûr de supprimer l'amende {fine} ?",
    links: [
      {
        id: 0,
        text: "Statistiques",
        page: "/statistic"
      },
      {
        id: 1,
        text: "Joueurs",
        page: "/players"
      },
      {
        id: 2,
        text: "Amendes",
        page: "/fines"
      }
    ],
    bestContributor: "{first_name} {last_name} avec {total} €",
    mostRecurrentFine: "{label} avec {total} récurrences",
    bestContributorTitle: "Meilleur donateur",
    mostRecurrentFineTitle: "Amende la plus récurrente",
    errorMessageLogin: "Mauvais email ou mot de passe"
  }
};

export default messages;
