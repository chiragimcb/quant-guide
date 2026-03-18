export interface Question {
  id: number;
  year?: string;
  topic: string;
  text: string;
  correctAnswer: string;
  solutionLogic: string; // Used to "prime" the Ghost
}

export const TSD_QUESTIONS: Question[] = [
  {
    id: 1,
    year: "CAT 2017",
    topic: "Average Speed",
    text: "Arun drove from home to his hostel at 60 km/h. While returning home he drove halfway at 30 km/h and the remaining distance at 10 km/h. What is his average speed (in km/h) for the entire round trip?",
    correctAnswer: "30 km/h",
    solutionLogic:
      "Total Distance / Total Time. Let distance one-way be D. Return time = (D/2)/30 + (D/2)/10.",
  },
  {
    id: 2,
    year: "CAT 2019",
    topic: "Relative Speed",
    text: "Two cars travel the same distance starting at 10:00 am and 11:00 am respectively, from the same place. The first car reaches the destination at 2:00 pm and the second car reaches at 3:30 pm. At what time did the second car overtake the first car?",
    correctAnswer: "12:40 pm",
    solutionLogic:
      "Ratio of time taken is 4h : 4.5h (8:9). Ratio of speeds is 9:8. Calculate the meeting point based on the 1-hour head start.",
  },
  {
    id: 3,
    year: "CAT 2021",
    topic: "Linear Races",
    text: "In a 500m race, B starts 45m ahead of A, but A wins the race while B is still 35m behind. What is the ratio of the speeds of A to B assuming that both start at the same time?",
    correctAnswer: "25:21",
    solutionLogic: "In the time A covers 500m, B covers (500 - 45 - 35) = 420m. Ratio = 500:420.",
  },
];
