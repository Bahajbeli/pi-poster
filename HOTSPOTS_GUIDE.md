# Guide de Configuration des Hotspots

## 🎨 Éditeur Visuel Interactif

### Comment utiliser l'éditeur de hotspots :

1. **Ouvrir l'éditeur** : Cliquez sur le bouton "Éditer les Hotspots" au-dessus de l'image
2. **Déplacer un hotspot** : Cliquez et glissez un hotspot pour le repositionner
3. **Redimensionner** : Utilisez les 8 poignées (handles) autour du hotspot sélectionné
4. **Ajouter un hotspot** : Cliquez sur "Ajouter un Hotspot" dans le panneau de droite
5. **Modifier les propriétés** : Sélectionnez un hotspot et modifiez ses propriétés dans le panneau
6. **Supprimer** : Cliquez sur le bouton X rouge sur un hotspot sélectionné
7. **Sauvegarder** : Cliquez sur "Sauvegarder les Modifications" pour enregistrer

### Fonctionnalités de l'éditeur :

#### 🖱️ Déplacement
- Cliquez sur un hotspot et glissez-le pour le déplacer
- Les coordonnées se mettent à jour en temps réel

#### 📏 Redimensionnement
- **8 poignées de redimensionnement** :
  - 4 coins : redimensionnement diagonal
  - 4 côtés : redimensionnement horizontal/vertical
- Maintenez la touche `Shift` pour conserver les proportions (optionnel)

#### ➕ Ajout de nouveaux hotspots
- Cliquez sur "Ajouter un Hotspot"
- Un nouveau hotspot apparaît à la position par défaut
- Ajustez sa position et sa taille
- Modifiez son titre, description et couche dans le panneau

#### ✏️ Édition des propriétés
Dans le panneau de droite, vous pouvez modifier :
- **Titre** : Nom du composant
- **Description** : Texte affiché dans la popup
- **Couche** : Sélectionnez la couche d'architecture
- **Coordonnées** : X, Y, Largeur, Hauteur (en pourcentage)

#### 💾 Sauvegarde et Export
- **Sauvegarder** : Enregistre dans le localStorage du navigateur
- **Exporter** : Télécharge un fichier JSON avec la configuration
- **Importer** : Charge une configuration depuis un fichier JSON

### Mode Debug

Le bouton "Activer Debug" affiche les coordonnées de chaque hotspot pour un positionnement précis.

### Format des coordonnées

Les hotspots utilisent des coordonnées en pourcentage (0-100%) pour s'adapter à toutes les tailles d'écran :
- `x`: Position horizontale depuis la gauche
- `y`: Position verticale depuis le haut
- `width`: Largeur de la zone
- `height`: Hauteur de la zone

### Conseils

1. **Zoom** : Utilisez le zoom du navigateur (Ctrl + Molette) pour un positionnement plus précis
2. **Sauvegarde régulière** : Exportez régulièrement votre configuration
3. **Test** : Fermez l'éditeur et testez les interactions pour vérifier l'alignement
4. **Précision** : Utilisez les champs numériques dans le panneau pour un positionnement exact

