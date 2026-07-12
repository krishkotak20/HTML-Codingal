import os

if os.path.exists('all-notes.txt'):
   os.remove('all-notes.txt')
   print('all-notes.txt deleted.')
else:
   print('all-notes.txt does not exist')