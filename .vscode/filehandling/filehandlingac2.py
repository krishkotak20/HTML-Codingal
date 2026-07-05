file = open("names.txt", "r")



content = file .read()

print("=== my bucket list ===")
print(content)

file.close()