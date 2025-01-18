# Cashome

Cashome est une application web de gestion financière familiale permettant aux membres d'un foyer de gérer leurs transactions, missions et ventes d'articles entre eux.

## Fonctionnalités

- Gestion des utilisateurs avec différents rôles (Membre, Banque)
- Création et gestion de foyers
- Transactions financières internes
- Création et accomplissement de missions rémunérées
- Vente d'articles entre membres du foyer
- Système de dépôt et retrait d'argent géré par le rôle "Banque"
- Tableau de bord personnalisé pour chaque utilisateur

## Technologies utilisées

- Next.js 13 avec App Router
- TypeScript
- Tailwind CSS
- NextUI pour les composants UI
- Prisma comme ORM
- SQLite comme base de données
- NextAuth.js pour l'authentification

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## Installation

1. Clonez le dépôt :
   ```
   git clone https://github.com/votre-username/cashome.git
   ```

2. Naviguez dans le dossier du projet :
   ```
   cd cashome
   ```

3. Installez les dépendances :
   ```
   npm install
   ```
   ou
   ```
   yarn install
   ```

4. Configurez les variables d'environnement :
   Copiez le fichier `.env.example` en `.env` et remplissez les variables nécessaires.

5. Exécutez les migrations Prisma :
   ```
   npx prisma migrate dev
   ```

6. Lancez le serveur de développement :
   ```
   npm run dev
   ```
   ou
   ```
   yarn dev
   ```

L'application devrait maintenant être accessible à l'adresse `http://localhost:3000`.

## Structure du projet

- `/src/app` : Pages et composants de l'application
- `/src/components` : Composants réutilisables
- `/src/lib` : Utilitaires et configurations
- `/prisma` : Schéma et migrations de la base de données

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.