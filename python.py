import os

directory = r"codeAndImage 1\Images\Tiles"

# Iterate through files and rename them with numerical indices
for i, filename in enumerate(os.listdir(directory), start=1):
    if os.path.isfile(os.path.join(directory, filename)):
        # Keep the original path
        basepath = os.path.split(filename)[0]
        new_filename = os.path.join(basepath, f"{i}.png")
        new_path = os.path.join(directory, new_filename)

        # Rename the file
        os.rename(os.path.join(directory, filename), new_path)
        print(f"Renamed '{filename}' to '{new_filename}'")

print("Files renamed in numerical order.")