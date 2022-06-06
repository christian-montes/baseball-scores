This project uses the Next.js React Framework to provide live scores of Major League Baseball games.

## About

This project seeks to emulate a lot of the great features of the MLB app on a website while giving some of the main components of the App a new look. Additionally, this project aims to make important data more accessible all while providing the user with a clean and functional view.

React.js is the backbone of this site. The use of React Hooks throughout makes it easy to manage the large amount of data that this app requires to operate properly. The data for one game can be viewed [here](https://statsapi.mlb.com//api/v1.1/game/661151/feed/live "MLB Game Data").

### Live scores
Providing live scores is the biggest feature this site provides. They can be seen on [this page](https://baseball-scores.vercel.app/scores "Live scores"). The main React component found on the Scores page is the Score component. It houses the necessary information to display the score of the game.
The Score component contains the following sub-components listed with their respective function:\
-**Team component** displays the team logo, name, record at the time the game took place, and runs scored.\
-**Bases component** manages all data related to base runners to correctly display where runners are currently on base.\
-**Inning component** displays the current inning, start time of the game, delays, or "Final" for finished games.\
*This site takes advantage of CSS media queries to load components depending on available screen size. The following components are not displayed to users on small screens*:\
-**Game Decisions component** displays the winning and losing pitcher as well as any pitcher that records a save.\
-**Probable Pitchers component** displays the probable pitchers that have been announced for the game.\
-**Skeleton component** shows a blank Score component when data has not finished loading in lieu of loading icons for a refined look.\

Each of these components can be found in the folder named components, or [here](https://github.com/christian-montes/baseball-scores/tree/main/components "Components").

### Static Pages
This project makes use of Next.js' Incremental Static Regeneration for pages that handle data that does not change constantly. For example, the [standings page](https://baseball-scores.vercel.app/standings "Standings") serves data that can only change when a game finishes. Therefore, the Standings page is a static page that serves the user the cached version of the page to make loading fast.

Other pages will be added will take advantage of this same technique.

### Comments
If you have any questions or comments regarding any aspect of this site, please send them my way. I would like to hear users' thoughts regarding the UX/UI.

**Disclaimer: This page and/or project is not associated in any form with MLB, MLB Franchises, or ESPN. Everything belongs to their respective owners.**
