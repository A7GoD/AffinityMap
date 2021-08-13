# Project Setup:
1.  Clone the project in a folder.
2. Run "yarn install" in cloned directory to install dependencies.
3. Run "yarn serve" to serve the project on localhost. Or run “yarn build” to build the project for production.

### Project demo video: https://youtu.be/2dbzLnLtK6o
### Hosted at: https://affinitymap.netlify.app

# System Architecture
 This project is created in VueJS framework.
 Here is the description of some important components.
## Bucket: 
This component displays the highlights in bucket form. The highlights corresponding to the bucket are displayed in their respective bucket.
## CreateHighlight: 
This component takes the content of the highlight from the user (group, content, color, and username), and creates a highlight component.
## FilterBox: 
This component takes name of the group from user, then hides all other highlights which do not correspond to the filters.
## Bucket: 
This component displays the highlights in bucket form. The highlights corresponding to the bucket are displayed in their respective bucket.
## Header: 
This component is container for FilterBox and CreateHighlight components and Group Highlights button.
## Highlight: 
This component Displays the Highlight in a card with the defined color.

## ZoomButtons: 
As the name suggest this component is a simple zoomin and zoomout button.

## AffinityMap: 
This is the component where everything comes together to display the affinity map.

## Store/index.js
This file contains configuration of central vuex storage, where all the data related to the highlight and groups is stored.
