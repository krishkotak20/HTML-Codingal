word = input('skip lines starting with: ')

file = open('names.txt', 'r')
for line in file:
    if line.startswith(word):
        print('skip ->', line.strip())
    else:
        print('keep ->', line.strip())
file.close()