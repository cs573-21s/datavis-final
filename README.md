Final Project - Interactive Data Visualization  
===
Ashish Gurung, Aaron Haim, Gabrielle Acquista, Tahrifa Lisa


Final Project - Overview
---
 [Website link](https://ashishjumbo.github.io/datavis-final/)


For this project, we started off trying to replicate a visualization on an [existing dataset](https://projects.fivethirtyeight.com/college-fight-song-lyrics/) explore the various visualization techniques we learned during this class to explore the insights we could gather through the other projects. Figure 1 shows a screenshot of the analysis that was done on the dataset with our dataset.

![screenshot of source dataset](/img/fivethirty-eight.png)
Figure 1: A screenshot of the visualization of the dataset that we wanted to analyze. 

We initially analyzed the dataset and tried to extend the visualization with additional information. We extracted the size of the stadiums of each school and extended our analysis to account for the stadium sizes. Next, we explored the trends in the songs, their bpm, and the size of the stadium. The working hypothesis was that the larger stadiums would have slower fight-song as a slower song is easier to synchronize across spectators in a larger stadium. Although there is a positive correlation between stadium size and the song's length, as shown in Figure 2, there is no relationship between the stadium size and the song's tempo.

![correlation](/img/correlation.png)
Figure 2: heatmap showing the correlation between the stadium size, beats per minute, and song length.

Figure 3 shows a screenshot of the [trend analysis](https://public.flourish.studio/visualisation/6096609/) we conducted on the dataset. We see no specific trend in the dataset as it appears that the fight songs seem to be influenced by factors other than simply the size of the stadium.

![flourish](/img/flourish2.png)
Figure 3: Visual representation of us exploring the ability to extend the pre-existing work.


**Note: As you can see, we found our attempts to extend the visualization to be somewhat limiting. Hence we decided to pivot and develop a visualization that facilitates the ability to ask intuitive questions about the dataset instead of our current conundrum where we are trying to figure out what to do with the dataset next. To do this, we analyzed various approaches to contextualizing the dataset and the ability to interpret the data directly and instantaneously. To achieve this, we decided to implement the dataset on the map as the geographical location of the schools would provide both political and geographical context to the schools. The [process book](process_book.pdf) details our design desisions and the [working deom](https://ashishjumbo.github.io/datavis-final/) shows a minimal viable product of our visualization.**
