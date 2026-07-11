file = open('imad.txt', 'r')
lines = file.readlines()
file.close()


out = open('odd.txt', 'w')

for i in range(0,len(lines),2):
    out.write(lines[i])

out.close()
print('odd line saved to oddlines.txt')