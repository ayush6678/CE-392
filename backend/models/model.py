import pandas as pd
from sklearn.tree import DecisionTreeRegressor
import pickle

# Load the CSV files
x_data = pd.read_excel("GCP's_RTK_UD_x.xlsx")
y_data = pd.read_excel("GCP's_RTK_UD_y.xlsx")
z_data = pd.read_excel("GCP's_RTK_UD_z.xlsx")

# Split the data into features (X) and target (y)
X_x = x_data["COUNT"].values.reshape(-1, 1)
y_x = x_data["RTK"].values

X_y = y_data["COUNT"].values.reshape(-1, 1)
y_y = y_data["RTK"].values

X_z = z_data["COUNT"].values.reshape(-1, 1)
y_z = z_data["RTK"].values

# Train the Decision Tree Regressor models
model_x = DecisionTreeRegressor()
model_x.fit(X_x, y_x)

model_y = DecisionTreeRegressor()
model_y.fit(X_y, y_y)

model_z = DecisionTreeRegressor()
model_z.fit(X_z, y_z)


# Function to predict error values based on count
def predict_error(count):
    models = {"x": model_x, "y": model_y, "z": model_z}
    predictions = {}
    for key, model in models.items():
        predictions[key] = model.predict([[count]])
    return predictions["x"][0], predictions["y"][0], predictions["z"][0]


# Example usage
count_value = 20
x_error, y_error, z_error = predict_error(count_value)
print(f"For count value {count_value}:")
print(f"X error: {x_error}")
print(f"Y error: {y_error}")
print(f"Z error: {z_error}")

# Export the models as a single pickle file
with open("rtk_0_ud.pkl", "wb") as file:
    pickle.dump({"x": model_x, "y": model_y, "z": model_z}, file)
