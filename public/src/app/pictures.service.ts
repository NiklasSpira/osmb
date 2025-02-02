import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PicturesService {
  getPictures() {
    return [
      {
        id: 1,
        name: 'Picture 1',
        url: 'https://picsum.photos/400/400?random=1',
        description: 'A beautiful shot of nature with random elements.',
      },
      {
        id: 2,
        name: 'Picture 2',
        url: 'https://picsum.photos/400/400?random=2',
        description:
          'An artistic capture with vibrant colors and random patterns.',
      },
      {
        id: 3,
        name: 'Picture 3',
        url: 'https://picsum.photos/400/400?random=3',
        description: 'A serene landscape with random scenic beauty.',
      },
      {
        id: 4,
        name: 'Picture 4',
        url: 'https://picsum.photos/400/400?random=4',
        description: 'A random abstract art piece with unique textures.',
      },
      {
        id: 5,
        name: 'Picture 5',
        url: 'https://picsum.photos/400/400?random=5',
        description: 'A random capture of urban life with dynamic elements.',
      },
      {
        id: 6,
        name: 'Picture 6',
        url: 'https://picsum.photos/400/400?random=6',
        description: 'A random shot of wildlife in its natural habitat.',
      },
      {
        id: 7,
        name: 'Picture 7',
        url: 'https://picsum.photos/400/400?random=7',
        description:
          'A random photograph showcasing the beauty of architecture.',
      },
      {
        id: 8,
        name: 'Picture 8',
        url: 'https://picsum.photos/400/400?random=8',
        description: 'A random image capturing the essence of a bustling city.',
      },
      {
        id: 9,
        name: 'Picture 9',
        url: 'https://picsum.photos/400/400?random=9',
        description: 'A random shot of a peaceful countryside landscape.',
      },
      {
        id: 10,
        name: 'Picture 10',
        url: 'https://picsum.photos/400/400?random=10',
        description: 'A random artistic photograph with a blend of colors.',
      },
      {
        id: 11,
        name: 'Picture 11',
        url: 'https://picsum.photos/400/400?random=11',
        description: 'A random capture of a stunning sunset over the horizon.',
      },
      {
        id: 12,
        name: 'Picture 12',
        url: 'https://picsum.photos/400/400?random=12',
        description:
          'A random image of a serene beach with crystal clear water.',
      },
      {
        id: 13,
        name: 'Picture 13',
        url: 'https://picsum.photos/400/400?random=13',
        description: 'A random photograph of a dense forest with tall trees.',
      },
      {
        id: 14,
        name: 'Picture 14',
        url: 'https://picsum.photos/400/400?random=14',
        description:
          'A random shot of a mountain range with snow-capped peaks.',
      },
      {
        id: 15,
        name: 'Picture 15',
        url: 'https://picsum.photos/400/400?random=15',
        description: 'A random image of a vibrant flower garden in full bloom.',
      },
      {
        id: 16,
        name: 'Picture 16',
        url: 'https://picsum.photos/400/400?random=16',
        description: 'A random capture of a tranquil lake surrounded by trees.',
      },
      {
        id: 17,
        name: 'Picture 17',
        url: 'https://picsum.photos/400/400?random=17',
        description:
          'A random photograph of a historic landmark with rich history.',
      },
      {
        id: 18,
        name: 'Picture 18',
        url: 'https://picsum.photos/400/400?random=18',
        description: 'A random shot of a bustling market with vibrant colors.',
      },
      {
        id: 19,
        name: 'Picture 19',
        url: 'https://picsum.photos/400/400?random=19',
        description:
          'A random image of a serene river flowing through a valley.',
      },
      {
        id: 20,
        name: 'Picture 20',
        url: 'https://picsum.photos/400/400?random=20',
        description: 'A random capture of a beautiful sunrise over the ocean.',
      },
      {
        id: 21,
        name: 'Picture 21',
        url: 'https://picsum.photos/400/400?random=21',
        description: 'A random photograph of a city skyline at night.',
      },
      {
        id: 22,
        name: 'Picture 22',
        url: 'https://picsum.photos/400/400?random=22',
        description:
          'A random shot of a picturesque village in the countryside.',
      },
      {
        id: 23,
        name: 'Picture 23',
        url: 'https://picsum.photos/400/400?random=23',
        description: 'A random image of a majestic waterfall in a forest.',
      },
      {
        id: 24,
        name: 'Picture 24',
        url: 'https://picsum.photos/400/400?random=24',
        description: 'A random capture of a desert landscape with sand dunes.',
      },
      {
        id: 25,
        name: 'Picture 25',
        url: 'https://picsum.photos/400/400?random=25',
        description:
          'A random photograph of a snowy landscape with pine trees.',
      },
      {
        id: 26,
        name: 'Picture 26',
        url: 'https://picsum.photos/400/400?random=26',
        description: 'A random shot of a vibrant street art mural.',
      },
      {
        id: 27,
        name: 'Picture 27',
        url: 'https://picsum.photos/400/400?random=27',
        description: 'A random image of a serene meadow with wildflowers.',
      },
      {
        id: 28,
        name: 'Picture 28',
        url: 'https://picsum.photos/400/400?random=28',
        description: 'A random capture of a historic castle on a hill.',
      },
      {
        id: 29,
        name: 'Picture 29',
        url: 'https://picsum.photos/400/400?random=29',
        description: 'A random photograph of a bustling city street.',
      },
      {
        id: 30,
        name: 'Picture 30',
        url: 'https://picsum.photos/400/400?random=30',
        description: 'A random shot of a tranquil beach at sunset.',
      },
      {
        id: 31,
        name: 'Picture 31',
        url: 'https://picsum.photos/400/400?random=31',
        description: 'A random image of a dense foggy forest.',
      },
      {
        id: 32,
        name: 'Picture 32',
        url: 'https://picsum.photos/400/400?random=32',
        description: 'A random capture of a vibrant cityscape at dusk.',
      },
      {
        id: 33,
        name: 'Picture 33',
        url: 'https://picsum.photos/400/400?random=33',
        description: 'A random photograph of a serene lake with reflections.',
      },
      {
        id: 34,
        name: 'Picture 34',
        url: 'https://picsum.photos/400/400?random=34',
        description:
          'A random shot of a beautiful garden with blooming flowers.',
      },
      {
        id: 35,
        name: 'Picture 35',
        url: 'https://picsum.photos/400/400?random=35',
        description: 'A random image of a historic bridge over a river.',
      },
      {
        id: 36,
        name: 'Picture 36',
        url: 'https://picsum.photos/400/400?random=36',
        description: 'A random capture of a vibrant autumn forest.',
      },
      {
        id: 37,
        name: 'Picture 37',
        url: 'https://picsum.photos/400/400?random=37',
        description: 'A random photograph of a serene mountain lake.',
      },
      {
        id: 38,
        name: 'Picture 38',
        url: 'https://picsum.photos/400/400?random=38',
        description: 'A random shot of a bustling city market.',
      },
      {
        id: 39,
        name: 'Picture 39',
        url: 'https://picsum.photos/400/400?random=39',
        description:
          'A random image of a tranquil river flowing through a forest.',
      },
      {
        id: 40,
        name: 'Picture 40',
        url: 'https://picsum.photos/400/400?random=40',
        description:
          'A random capture of a beautiful sunset over the mountains.',
      },
      {
        id: 41,
        name: 'Picture 41',
        url: 'https://picsum.photos/400/400?random=41',
        description: 'A random photograph of a vibrant city skyline.',
      },
      {
        id: 42,
        name: 'Picture 42',
        url: 'https://picsum.photos/400/400?random=42',
        description: 'A random shot of a picturesque village in the mountains.',
      },
      {
        id: 43,
        name: 'Picture 43',
        url: 'https://picsum.photos/400/400?random=43',
        description:
          'A random image of a majestic waterfall in a tropical forest.',
      },
      {
        id: 44,
        name: 'Picture 44',
        url: 'https://picsum.photos/400/400?random=44',
        description: 'A random capture of a serene desert landscape.',
      },
      {
        id: 45,
        name: 'Picture 45',
        url: 'https://picsum.photos/400/400?random=45',
        description: 'A random photograph of a snowy mountain peak.',
      },
      {
        id: 46,
        name: 'Picture 46',
        url: 'https://picsum.photos/400/400?random=46',
        description: 'A random shot of a vibrant street festival.',
      },
      {
        id: 47,
        name: 'Picture 47',
        url: 'https://picsum.photos/400/400?random=47',
        description: 'A random image of a serene meadow with wildflowers.',
      },
      {
        id: 48,
        name: 'Picture 48',
        url: 'https://picsum.photos/400/400?random=48',
        description: 'A random capture of a historic castle on a hill.',
      },
      {
        id: 49,
        name: 'Picture 49',
        url: 'https://picsum.photos/400/400?random=49',
        description: 'A random photograph of a bustling city street.',
      },
      {
        id: 50,
        name: 'Picture 50',
        url: 'https://picsum.photos/400/400?random=50',
        description: 'A random shot of a tranquil beach at sunset.',
      },
    ];
  }

  constructor() {}
}
