# module02_colorpicker_app

**----------OBJECTIF PRINCIPAL----------**
Application de génération de nuanciers de couleurs basé sur des images.

"Dans quelle mesure l'utilisation de photos de belle composition permet de générer des nuanciers élégants"

**----------FONCTIONNALITÉS----------**

__2 moyens de générer des nuanciers:__

1. Utilisation d'une image fournie par l'app et choisie par nos soins (curated content)
    * Les images sont classées en catégories :
      * Still life
      * Human
      * Cold
      * Hot
      * Nature

2. Upload de photos depuis le disque de l'user

* Possibilité de pipeter des nuances dans l'image (à investiguer - BONUS STYLÉ, effet wahou).
* Utilisation de la library Vibrant.js ? https://jariz.github.io/vibrant.js/ (à tester - prototyper)

__Home__

Par défaut quand on arrive sur la home/dashboard une image random parmi le curated content

__Nuanciers:__

* 5 couleurs générées depuis l'image
* Obligation de nommer son nuancier
* Peuvent être sauvegardés par les utilisateurs dans leur profil (CRUD)
  (On ne peut pas update une couleur d'un nuancier mais son nom par ex.)

**----------PAGES----------**
* Page Login
* Page Dashboard / (Choix d'image + génération nuancier + option upload)
* Page Profil

**----------BASE DE DONNÉES----------**

__Plusieurs collections:__
Users {id, name, lastname, nickname, password, city, link perso, instagram, id palettes}
Nuanciers {id, array de colors (1 type de dénomination couleurs ou plusieurs ?)}
Photos (link, category id, palette id)

Nuanciers

Photos (à définir)

**----------LINKS----------**
1. Vibrant.js 
#### https://jariz.github.io/vibrant.js/

2. Pour pouvoir select la couleur d'un pixel
#### https://www.script-tutorials.com/creating-an-html5-canvas-image-color-picker/

#### https://www.cssscript.com/pick-a-color-from-an-image-using-canvas-and-javascript/
