import Hotel from '#models/hotel';
import edge from 'edge.js';

import { edgeIconify, addCollection } from 'edge-iconify';
import { icons as heroIcons } from '@iconify-json/iconoir';

addCollection(heroIcons);
edge.use(edgeIconify);
edge.global('preloadData', { Hotel });
