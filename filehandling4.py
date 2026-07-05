file = open("names.txt", "a")
file.write("6.be better at cricket than haris\n")
file.write("7.be the best in the yr at football\n")
file.write("8.do nothing in class and have fun")
print("3 more items added!")

file = open("names.txt", "r")
print(file.read())
file.close()