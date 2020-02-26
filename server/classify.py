from fastai.vision import *
import os

print(sys.argv)

path = Path(os.path.realpath('./server/cnn') + '/')

learn = load_learner(path, 'export.pkl')

learn.load('stage-final')
defaults.device = torch.device('cpu')
img = open_image(os.environ['IMAGE_PATH'])

pred_class, pred_idx, outputs = learn.predict(img)
print(pred_class)
