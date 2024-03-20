import csv
import numpy as np
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split

# Load the data from the Excel file
data = []
with open(
    r"C:\Users\Ayush\Desktop\BHU_PIX4D_Half_Fulloverlap_RTK_CPVsRMSEy.csv", "r"
) as file:
    reader = csv.reader(file)
    next(reader)  # Skip the header row
    for row in reader:
        count, overlap_60, overlap_80, rtk = row
        data.append([int(count), float(overlap_60), float(overlap_80), float(rtk)])

# Split the data into features (X) and target (y)
X = np.array([row[:3] for row in data])
y = np.array([row[3] for row in data])

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train the model
model = DecisionTreeRegressor()
model.fit(X_train, y_train)


# Function to make predictions
def predict_error(count, overlap_percent):
    if overlap_percent == 60:
        overlap_idx = 1
    elif overlap_percent == 80:
        overlap_idx = 2
    else:
        print("Invalid overlap percentage. Please enter 60 or 80.")
        return

    prediction = model.predict([[count, X[0, overlap_idx], X[0, overlap_idx]]])
    return prediction[0]
