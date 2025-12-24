export const MOCK_NEARBY_PLACES = [
    { "location_name": "Calangute Beach", "estimated_expense_INR": 2000, "distance_from_specific_point_km": 15, "time_to_travel_hours": 1 },
    { "location_name": "Basilica of Bom Jesus", "estimated_expense_INR": 1500, "distance_from_specific_point_km": 10, "time_to_travel_hours": 0.5 },
    { "location_name": "Fort Aguada", "estimated_expense_INR": 1800, "distance_from_specific_point_km": 18, "time_to_travel_hours": 1.5 },
    { "location_name": "Dudhsagar Waterfalls", "estimated_expense_INR": 3000, "distance_from_specific_point_km": 60, "time_to_travel_hours": 2 },
    { "location_name": "Baga Beach", "estimated_expense_INR": 2000, "distance_from_specific_point_km": 16, "time_to_travel_hours": 1 },
    { "location_name": "Anjuna Flea Market", "estimated_expense_INR": 2500, "distance_from_specific_point_km": 20, "time_to_travel_hours": 1.5 },
    { "location_name": "Casino Royale Goa", "estimated_expense_INR": 4000, "distance_from_specific_point_km": 7, "time_to_travel_hours": 1 },
    { "location_name": "Chapora Fort", "estimated_expense_INR": 1000, "distance_from_specific_point_km": 22, "time_to_travel_hours": 1.5 },
    { "location_name": "Mangeshi Temple", "estimated_expense_INR": 1000, "distance_from_specific_point_km": 26, "time_to_travel_hours": 1 },
    { "location_name": "Naval Aviation Museum", "estimated_expense_INR": 1500, "distance_from_specific_point_km": 30, "time_to_travel_hours": 1.5 },
    { "location_name": "Butterfly Beach", "estimated_expense_INR": 2500, "distance_from_specific_point_km": 40, "time_to_travel_hours": 2 }
];

export const MOCK_ROADMAP = [
    {
        "day_number": 1,
        "mode_of_transportation": "Flight from Delhi to Goa",
        "accommodation": "Hotel Calangute Towers, Near Calangute Beach",
        "activities": [
            { "activity": "Rest & Freshen Up", "time": "2 hours" },
            { "activity": "Visit Calangute Beach", "time": "3 hours" },
            { "activity": "Dinner at Pousada By The Beach", "time": "2 hours" }
        ],
        "total_estimated_expense": 12000
    },
    {
        "day_number": 2,
        "mode_of_transportation": "Rental Bike",
        "accommodation": "Hotel Calangute Towers, Near Calangute Beach",
        "activities": [
            { "activity": "Visit Aguada Fort", "time": "2 hours" },
            { "activity": "Lunch at Fisherman's Wharf", "time": "2 hours" },
            { "activity": "Visit Candolim Beach", "time": "3 hours" },
            { "activity": "Dinner at Suwad Restaurant", "time": "2 hours" }
        ],
        "total_estimated_expense": 8000
    },
    {
        "day_number": 3,
        "mode_of_transportation": "Rental Bike",
        "accommodation": "Hotel Calangute Towers, Near Calangute Beach",
        "activities": [
            { "activity": "Visit Basilica of Bom Jesus", "time": "2 hours" },
            { "activity": "Lunch at Gunpowder", "time": "2 hours" },
            { "activity": "Visit Baga Beach", "time": "3 hours" },
            { "activity": "Dinner at Britto's", "time": "2 hours" }
        ],
        "total_estimated_expense": 8000
    },
    {
        "day_number": 4,
        "mode_of_transportation": "Rental Bike",
        "accommodation": "Hotel Calangute Towers, Near Calangute Beach",
        "activities": [
            { "activity": "Visit Dudhsagar Waterfalls", "time": "3 hours" },
            { "activity": "Lunch at Spice Goa", "time": "2 hours" },
            { "activity": "Visit Anjuna Flea Market", "time": "3 hours" },
            { "activity": "Dinner at Vinayak Family Restaurant", "time": "2 hours" }
        ],
        "total_estimated_expense": 8000
    },
    {
        "day_number": 5,
        "mode_of_transportation": "Flight from Goa to Delhi",
        "accommodation": "N/A",
        "activities": [
            { "activity": "Checkout from Hotel", "time": "1 hour" },
            { "activity": "Lunch at Fishka", "time": "2 hours" },
            { "activity": "Visit Goa Chitra Museum", "time": "2 hours" },
            { "activity": "Departure to Airport", "time": "1 hour" }
        ],
        "total_estimated_expense": 8000
    }
];

export const MOCK_LOCAL_GUIDE = {
    local_foods_drinks: [
        {
            name: 'Zero Valley Stew',
            description: "A hearty stew made with locally sourced ingredients like root vegetables and wild game. It's a staple in every household during the cold months."
        },
        {
            name: 'Valley Brew',
            description: 'A unique beer brewed locally using a blend of different grains and hops found only in the region.'
        }
    ],
    local_markets: [
        {
            name: 'Zero Valley Farmers Market',
            description: "A vibrant market where locals buy fresh produce, homemade crafts, and other local goods. It's open every Sunday."
        },
        {
            name: 'Valley Goods Store',
            description: 'A traditional shop that offers a range of local products, from foodstuffs to handmade crafts.'
        }
    ],
    local_transportation: [
        {
            type: 'Foot',
            description: 'Much of Zero Valley is best explored on foot due to its compact size and beautiful scenery.'
        },
        {
            type: 'Bicycle',
            description: 'Cycling is a popular form of transportation among locals, particularly in the warmer months.'
        }
    ],
    hidden_spots: [
        {
            name: 'Hidden Waterfall',
            description: "A beautiful waterfall tucked away in a secluded part of the valley. It's a favorite spot for locals to relax and enjoy nature."
        },
        {
            name: 'Valley Viewpoint',
            description: 'A hidden gem that offers stunning panoramic views of the entire valley. Only locals know the hiking trail leading up to it.'
        }
    ],
    local_customs: [
        {
            name: 'Morning Greetings',
            description: "Locals have a tradition of greeting each other with a friendly 'Good morning' and a wave, regardless of familiarity."
        },
        {
            name: 'Community Gatherings',
            description: 'Community gatherings are a common occurrence where locals come together to share meals and stories.'
        }
    ],
    daily_routines: [
        {
            time: 'Morning',
            activity: 'Locals usually start their day early with a hearty breakfast at home before heading out for work or chores.'
        },
        {
            time: 'Afternoon',
            activity: "Lunch is typically a large meal enjoyed with family or friends. Many locals also take a short nap or 'siesta' after lunch."
        },
        {
            time: 'Evening',
            activity: 'Dinner is a social event, often spent at local eateries or at home with extended family.'
        }
    ],
    cultural_practices: [
        {
            name: 'Valley Day Festival',
            description: "An annual festival celebrated in the spring, featuring local music, dance, food, and games. It's a time for the community to come together and celebrate their heritage."
        }
    ]
};
