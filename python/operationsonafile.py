file = open('names.txt', 'r')
lines = file.readlines()



file.close()

print('total lines:', len(lines))

for i in range(len(lines)):
    print(i + 1, '->', lines[i].strip())