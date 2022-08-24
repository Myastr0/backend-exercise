# Setup

- Setup sqlite database

# TODO

1. Consumer logic

- Ajouter un validateur
- Gérer les cas d'erreur post fail validation

- Ajouter dans la db 
- Gérer les cas d'erreur post fail insertion


2. Transaction business
   - Voir en fonction du status
   - Event = Transaction events (IN + /OUT -) (PENDING / CANCELED / VALIDATED)
# Questions

Q: Pas de schéma de db créé par défaut ?
A: A toi de la créer

  - Création de la table transaction
  - Création de la table account
  - Création de la table user


---
Q: sqlite not create file
A:

---
Q: A quoi correspondent au niveau métier les champs `createdAt`, `updatedAt`, `transactionAt` et `executedAt`
A: 

---
Q: Vous utilisez quoi comme techno de validation de json 
