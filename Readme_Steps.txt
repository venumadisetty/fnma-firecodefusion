Step 1: pip install -r requirements.txt
 

Step 2: Set the following environment variables:

set BEDROCK_AGENT_ID=2YIKFY1K7M
set AWS_DEFAULT_REGION=us-east-1
set AWS_ACCESS_KEY_ID=(use the one I've shared)
set AWS_SECRET_ACCESS_KEY=(use the one I've shared)
 


Step 3: Run the following command to start the Streamlit app:
 
streamlit run app.py --server.port=8080 --server.address=localhost