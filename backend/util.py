import pickle
from flask import jsonify
import os


def prediction(count, mode, percent, distribution):

    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # Path to the models folder
    models_folder = os.path.join(current_dir, "models")

    dist = "center"
    if distribution == "Center-Distribution":
        dist = "center"
    if distribution == "Uniform-Distribution":
        dist = "ud"
    if distribution == "Half-of-Area":
        dist = "ha"
    if distribution == "Corner-Distribution":
        dist = "corner"

    t1 = mode
    per = 60
    if t1 == "percent":
        t1 = "gcp"
    else:
        t1 = "rtk"
        per = 0

    model_filename = f"{t1}_{per}_{dist}.pkl"

    # Path to the model file
    model_file_path = os.path.join(models_folder, model_filename)

    # Load the models from the pickle file
    with open(model_file_path, "rb") as file:
        models = pickle.load(file)

    # Get the individual models
    model_x = models["x"]
    model_y = models["y"]
    model_z = models["z"]

    # Assuming your model has a predict_error function
    x_pred = model_x.predict([[count]])
    y_pred = model_y.predict([[count]])
    z_pred = model_z.predict([[count]])
    return jsonify({"x": x_pred[0], "y": y_pred[0], "z": z_pred[0]})
