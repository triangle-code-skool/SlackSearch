# Import required libraries
from dotenv import load_dotenv  # Load environment variables from .env file
import os  # Access operating system functionality
import requests  # Make HTTP requests to Slack API
import json  # Handle JSON data parsing and formatting

# Load environment variables from .env file
load_dotenv()
# Get Slack authentication token from environment variables
# Try 'TOKEN' first, fall back to 'SLACK_TOKEN' if not found
SLACK_BOT_TOKEN = os.getenv('TOKEN') or os.getenv('SLACK_TOKEN')

def main():
    """
    Main function to fetch user data from Slack API.
    
    Attempts to retrieve the list of users from the Slack workspace using the API.
    If the API call fails, falls back to parsing dummy data from a local JSON file.
    """
    # Validate that the Slack token is available
    if not SLACK_BOT_TOKEN:
        print("Error: SLACK_BOT_TOKEN or SLACK_TOKEN not found in environment variables.")
        print("Make sure your .env file has a bot token (starts with xoxb-) or user token (starts with xoxp-)")
        return

    # Configure Slack API endpoint for retrieving users
    url = "https://slack.com/api/users.list"
    # Set up authentication header with bearer token
    headers = {
        "Authorization": f"Bearer {SLACK_BOT_TOKEN}"
    }

    try:
        # Make GET request to Slack API
        print(f"Fetching users from {url}...")
        response = requests.get(url, headers=headers)
        # Raise an exception if the HTTP request returned an error status code
        response.raise_for_status()
        
        # Parse the JSON response from Slack API
        data = response.json()
        print("RESPONSE: ", data)
        
        # Check if the Slack API request was successful
        if data.get("ok"):
            # Extract the list of members from the response
            members = data.get('members', [])
            print(f"Successfully retrieved {len(members)} users.")
            
            # Display a sample user record to verify data structure
            if members:
                print("Sample user data:")
                print(json.dumps(members[0], indent=2))
        # If there's an error in the response, fall back to dummy data
        elif data.get('error'):
            parse_slack_json()
        else:
            print(f"Error from Slack API: {data.get('error')}")         
    except requests.exceptions.RequestException as e:
        # Handle any network or HTTP errors
        print(f"Request failed: {e}")

def parse_slack_json():
    """
    Parse user data from a local dummy_data.json file.
    
    This function serves as a fallback when the Slack API is unavailable.
    It reads the dummy data file, parses it, and displays the extracted information.
    """
    # Construct the absolute path to dummy_data.json
    # Navigate up two levels from ingestor/src/ to reach the project root
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(os.path.dirname(current_dir))
    file_path = os.path.join(project_root, 'dummy_data.json')

    # Open and load the JSON data from the file
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            print(f"Successfully loaded {len(data)} records.")
            # Extract relevant fields from the raw data
            parsed_data = parse_data(data)
            write_data(parsed_data)
    except FileNotFoundError:
        # Handle case where the dummy data file doesn't exist
        print(f"Error: Could not find file at {file_path}")

def parse_data(data):
    """
    Extract name, phone, and email from raw user data.
    
    Args:
        data: List of user account dictionaries containing seed_identity information
        
    Returns:
        List of dictionaries with simplified user data (name, phone, email)
    """
    parsed_data = []
    # Iterate through each account in the data
    for account in data:
        # Extract user information from the seed_identity nested object
        name = account["seed_identity"]["real_name"]
        phone = account["seed_identity"]["phone"]
        email = account["seed_identity"]["email"]
        # Create a simplified user record with only essential fields
        parsed_data.append({
            "name": name,
            "phone": phone,
            "email": email
        })
    return parsed_data

def write_data(parsed_data):
    """
    Write parsed user data to a JSON file in the output directory.
    
    Args:
        parsed_data: List of dictionaries containing user information
    """
    # Construct the path to the output directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    ingestor_dir = os.path.dirname(current_dir)
    output_dir = os.path.join(ingestor_dir, "output")
    
    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Define the output file path
    output_file = os.path.join(output_dir, "slack_raw.json")
    
    # Write the parsed data to the JSON file
    try:
        with open(output_file, 'w') as f:
            json.dump(parsed_data, f, indent=2)
        print(f"Successfully wrote {len(parsed_data)} records to {output_file}")
    except Exception as e:
        print(f"Error writing to file: {e}")

# Entry point: Execute main function when script is run directly
if __name__ == "__main__":
    main()