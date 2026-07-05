file = open("names.txt", "r")
lines = file.readlines()
file.close()


print(f"You have {len(lines)} items on your bucket list")


print(lines)