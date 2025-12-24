import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from "dotenv";

// Load environment variables from .env file (if using dotenv)
dotenv.config();

// Initialize the ChatOpenAI model with the API key
const model = new ChatOpenAI({
  modelName: "gpt-4", // Specify model name (e.g., GPT-4)
  openAIApiKey: process.env.OPENAI_API_KEY, // Use the API key from environment variables
  temperature: 0.7, // Adjust for creativity if needed
});


/**
 * Function to get nearby places based on the given location name.
 * The response is formatted as an array of objects with details like
 * location name, expense, time required to travel, and distance.
 *
 * @param {string} location - The name of the starting location
 * @returns {Promise<Array>} - A Promise that resolves to an array of location objects
 */
export async function getNearbyPlaces(location) {
  // return JSON.parse(`[{"location_name":"Calangute Beach","estimated_expense_INR":2000,"distance_from_specific_point_km":15,"time_to_travel_hours":1},{"location_name":"Basilica of Bom Jesus","estimated_expense_INR":1500,"distance_from_specific_point_km":10,"time_to_travel_hours":0.5},{"location_name":"Fort Aguada","estimated_expense_INR":1800,"distance_from_specific_point_km":18,"time_to_travel_hours":1.5},{"location_name":"Dudhsagar Waterfalls","estimated_expense_INR":3000,"distance_from_specific_point_km":60,"time_to_travel_hours":2},{"location_name":"Baga Beach","estimated_expense_INR":2000,"distance_from_specific_point_km":16,"time_to_travel_hours":1},{"location_name":"Anjuna Flea Market","estimated_expense_INR":2500,"distance_from_specific_point_km":20,"time_to_travel_hours":1.5},{"location_name":"Casino Royale Goa","estimated_expense_INR":4000,"distance_from_specific_point_km":7,"time_to_travel_hours":1},{"location_name":"Chapora Fort","estimated_expense_INR":1000,"distance_from_specific_point_km":22,"time_to_travel_hours":1.5},{"location_name":"Mangeshi Temple","estimated_expense_INR":1000,"distance_from_specific_point_km":26,"time_to_travel_hours":1},{"location_name":"Naval Aviation Museum","estimated_expense_INR":1500,"distance_from_specific_point_km":30,"time_to_travel_hours":1.5},{"location_name":"Butterfly Beach","estimated_expense_INR":2500,"distance_from_specific_point_km":40,"time_to_travel_hours":2}]`);
  // Define the query to get nearby places based on the location
  const query = `Provide a list of tourist attractions near ${location}. 
  For each place, include the name, estimated expense, 
  time required to visit, and the distance from any specific point of ${location} in kilometers. Provide 8-15 places.`;

  // Send the query to the OpenAI model
  const messages = [
    new SystemMessage("You are a travel assistant."),
    new SystemMessage("You need to provide content in json format data."),
    new SystemMessage(`It content will be an array of object where every object has keys: location_name,
        estimated expense in INR, distance from a common point, time to travel.`),
    new HumanMessage(query),
    new SystemMessage('Make sure to return only a JSON array of objects and no extra text or explanation.')
  ];

  // Get the response from the model
  const response = await model.invoke(messages);
  const places = JSON.parse(response.content);

  return places;
}


/**
 * Function to get a travel roadmap based on start point, destination, budget, and number of days.
 * The response is a detailed day-by-day travel plan with options for transportation, accommodation, and activities.
 *
 * @param {string} start - The starting point of the journey
 * @param {string} destination - The destination of the journey
 * @param {number} budget - The budget for the trip in INR
 * @param {number} days - Number of days for the trip
 * @returns {Promise<Array>} - A Promise that resolves to an array of roadmap objects for each day
 */
export async function getTravelRoadmap(start, destination, budget, days, pointOfAttractions = [], hotels = []) {
  // return JSON.parse(`[{"day_number":1,"mode_of_transportation":"Flight from Delhi to Goa","accommodation":"Hotel Calangute Towers, Near Calangute Beach","activities":[{"activity":"Rest & Freshen Up","time":"2 hours"},{"activity":"Visit Calangute Beach","time":"3 hours"},{"activity":"Dinner at Pousada By The Beach","time":"2 hours"}],"total_estimated_expense":12000},{"day_number":2,"mode_of_transportation":"Rental Bike","accommodation":"Hotel Calangute Towers, Near Calangute Beach","activities":[{"activity":"Visit Aguada Fort","time":"2 hours"},{"activity":"Lunch at Fisherman's Wharf","time":"2 hours"},{"activity":"Visit Candolim Beach","time":"3 hours"},{"activity":"Dinner at Suwad Restaurant","time":"2 hours"}],"total_estimated_expense":8000},{"day_number":3,"mode_of_transportation":"Rental Bike","accommodation":"Hotel Calangute Towers, Near Calangute Beach","activities":[{"activity":"Visit Basilica of Bom Jesus","time":"2 hours"},{"activity":"Lunch at Gunpowder","time":"2 hours"},{"activity":"Visit Baga Beach","time":"3 hours"},{"activity":"Dinner at Britto's","time":"2 hours"}],"total_estimated_expense":8000},{"day_number":4,"mode_of_transportation":"Rental Bike","accommodation":"Hotel Calangute Towers, Near Calangute Beach","activities":[{"activity":"Visit Dudhsagar Waterfalls","time":"3 hours"},{"activity":"Lunch at Spice Goa","time":"2 hours"},{"activity":"Visit Anjuna Flea Market","time":"3 hours"},{"activity":"Dinner at Vinayak Family Restaurant","time":"2 hours"}],"total_estimated_expense":8000},{"day_number":5,"mode_of_transportation":"Flight from Goa to Delhi","accommodation":"N/A","activities":[{"activity":"Checkout from Hotel","time":"1 hour"},{"activity":"Lunch at Fishka","time":"2 hours"},{"activity":"Visit Goa Chitra Museum","time":"2 hours"},{"activity":"Departure to Airport","time":"1 hour"}],"total_estimated_expense":8000}]`)
  // Define the query to get the travel roadmap
  const query = `Create a detailed travel roadmap for a trip from ${start} to ${destination}. 
    The budget is ${budget} INR and the trip duration is ${days} days. 
    Include the following details for each day:
    - Modes of transportation
    - Recommended places to stay
    - Suggested activities and places to visit
    - Time allocation for each activity
    - Meals or restaurants, if relevant
    Ensure the roadmap is detailed and time-wise for each day.`;

  // Send the query to the OpenAI model
  const messages = [
    new SystemMessage("You are a travel assistant providing a detailed roadmap."),
    new SystemMessage("You need to provide content in json format data."),
    new SystemMessage(`The response will be an array of objects. Each object will represent a day in the trip and have the following keys: 
          day_number, mode_of_travel, accommodation, activities (which includes places to visit, time to spend, meals if applicable), and total_estimated_expense for the day in INR.`),
    new SystemMessage(`Generate data in followin format: [
        "day_number": ---,
        "mode_of_transportation": ---,
        "accommodation": ---,
        "activities": [
            {
                "activity": ---,
                "time": ---,
            }
        ],
        "total_estimated_expense": ---,
      ]`),
    new HumanMessage(query),
    new SystemMessage(`You can take these point of attractions for refrence : ${pointOfAttractions.join(', ')}`),
    new SystemMessage(`Take refrence of hotels  ${JSON.stringify(hotels)}`),
    new SystemMessage('Make sure to return only a JSON array of objects and no extra text or explanation.')
  ];
  // Get the response from the model
  const response = await model.invoke(messages);
  const travelRoadmap = JSON.parse(response.content);

  return travelRoadmap;
}


/**
 * Function to provide suggestions on how to live like a local based on the given location.
 * The response is a detailed guide on local foods, customs, hidden spots, transportation, and
 * things that locals typically do in their daily life.
 *
 * @param {string} location - The name of the location
 * @returns {Promise<Object>} - A Promise that resolves to an object containing local living tips
 */
export async function liveLikeLocal(location) {
  // return {
  //   local_foods_drinks: [
  //     {
  //       name: 'Zero Valley Stew',
  //       description: "A hearty stew made with locally sourced ingredients like root vegetables and wild game. It's a staple in every household during the cold months."
  //     },
  //     {
  //       name: 'Valley Brew',
  //       description: 'A unique beer brewed locally using a blend of different grains and hops found only in the region.'
  //     }
  //   ],
  //   local_markets: [
  //     {
  //       name: 'Zero Valley Farmers Market',
  //       description: "A vibrant market where locals buy fresh produce, homemade crafts, and other local goods. It's open every Sunday."
  //     },
  //     {
  //       name: 'Valley Goods Store',
  //       description: 'A traditional shop that offers a range of local products, from foodstuffs to handmade crafts.'
  //     }
  //   ],
  //   local_transportation: [
  //     {
  //       type: 'Foot',
  //       description: 'Much of Zero Valley is best explored on foot due to its compact size and beautiful scenery.'
  //     },
  //     {
  //       type: 'Bicycle',
  //       description: 'Cycling is a popular form of transportation among locals, particularly in the warmer months.'
  //     }
  //   ],
  //   hidden_spots: [
  //     {
  //       name: 'Hidden Waterfall',
  //       description: "A beautiful waterfall tucked away in a secluded part of the valley. It's a favorite spot for locals to relax and enjoy nature."
  //     },
  //     {
  //       name: 'Valley Viewpoint',
  //       description: 'A hidden gem that offers stunning panoramic views of the entire valley. Only locals know the hiking trail leading up to it.'
  //     }
  //   ],
  //   local_customs: [
  //     {
  //       name: 'Morning Greetings',
  //       description: "Locals have a tradition of greeting each other with a friendly 'Good morning' and a wave, regardless of familiarity."
  //     },
  //     {
  //       name: 'Community Gatherings',
  //       description: 'Community gatherings are a common occurrence where locals come together to share meals and stories.'
  //     }
  //   ],
  //   daily_routines: [
  //     {
  //       time: 'Morning',
  //       activity: 'Locals usually start their day early with a hearty breakfast at home before heading out for work or chores.'
  //     },
  //     {
  //       time: 'Afternoon',
  //       activity: "Lunch is typically a large meal enjoyed with family or friends. Many locals also take a short nap or 'siesta' after lunch."
  //     },
  //     {
  //       time: 'Evening',
  //       activity: 'Dinner is a social event, often spent at local eateries or at home with extended family.'
  //     }
  //   ],
  //   cultural_practices: [
  //     {
  //       name: 'Valley Day Festival',
  //       description: "An annual festival celebrated in the spring, featuring local music, dance, food, and games. It's a time for the community to come together and celebrate their heritage."
  //     }
  //   ]
  // }
  // Define the query to get tips on living like a local
  const query = `Provide a detailed guide on how to live like a local in ${location}.
  Include the following:
  - Local foods and drinks that people regularly consume
  - Traditional markets or shops where locals buy their goods
  - Common modes of transportation that locals use
  - Hidden or offbeat spots that only locals know about
  - Local customs or habits (e.g., social behavior, greetings)
  - Daily routines or activities (e.g., when and where they have breakfast, lunch, or dinner)
  - Any cultural practices or festivals celebrated in this area.
  Provide these in a well-structured way so that a traveler can immerse in the local life.`;

  // Send the query to the OpenAI model
  const messages = [
    new SystemMessage("You are a travel assistant providing an immersive local experience."),
    new SystemMessage("You need to provide content in json format data."),
    new SystemMessage(`The response will be a structured JSON object with the following keys:
      "local_foods_drinks": [],
      "local_markets": [],
      "local_transportation": [],
      "hidden_spots": [],
      "local_customs": [],
      "daily_routines": [],
      "cultural_practices": []
    `),
    new HumanMessage(query),
    new SystemMessage('Make sure to return only a JSON object with the necessary data and no extra text.'),
  ];

  // Get the response from the model
  const response = await model.invoke(messages);
  const localGuide = JSON.parse(response.content);

  return localGuide;
}

// console.log(JSON.stringify(await getNearbyPlaces('goa')));