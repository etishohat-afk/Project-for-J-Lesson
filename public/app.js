document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('profiles-container');

  function getAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
  }

  function createCard(profile) {
    const card = document.createElement('div');
    card.className = 'profile-card';

    const img = document.createElement('img');
    img.src = profile.photo_url || 'https://via.placeholder.com/96';
    img.alt = `${profile.first_name} ${profile.last_name}`;

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = `${profile.first_name} ${profile.last_name}, ${getAge(profile.birth_date)}`;

    const bio = document.createElement('div');
    bio.className = 'bio';
    bio.textContent = profile.bio || '';

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const passBtn = document.createElement('button');
    passBtn.className = 'btn-pass';
    passBtn.textContent = '❌ Pass';
    passBtn.addEventListener('click', () => card.remove());

    const likeBtn = document.createElement('button');
    likeBtn.className = 'btn-like';
    likeBtn.textContent = '✅ Like';
    likeBtn.addEventListener('click', async () => {
      await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ swiper_id: 1, swiped_id: profile.user_id }),
      });
      card.remove();
    });

    actions.appendChild(passBtn);
    actions.appendChild(likeBtn);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(bio);
    card.appendChild(actions);

    return card;
  }

  try {
    const res = await fetch('/api/profiles');
    const profiles = await res.json();
    profiles.forEach(profile => container.appendChild(createCard(profile)));
  } catch (err) {
    console.error('Failed to load profiles:', err);
  }
});

/*********************/
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('profiles-container');

  function getAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
  }

  function createCard(profile) {
    const card = document.createElement('div');
    card.className = 'profile-card';

    const img = document.createElement('img');
    img.src = profile.photo_url || 'https://via.placeholder.com/96';
    img.alt = `${profile.first_name} ${profile.last_name}`;

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = `${profile.first_name} ${profile.last_name}, ${getAge(profile.birth_date)}`;

    const bio = document.createElement('div');
    bio.className = 'bio';
    bio.textContent = profile.bio || '';

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const passBtn = document.createElement('button');
    passBtn.className = 'btn-pass';
    passBtn.textContent = '❌ Pass';
    passBtn.addEventListener('click', () => card.remove());

    const likeBtn = document.createElement('button');
    likeBtn.className = 'btn-like';
    likeBtn.textContent = '✅ Like';
    likeBtn.addEventListener('click', async () => {
      await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ swiper_id: 1, swiped_id: profile.user_id }),
      });
      card.remove();
    });

    actions.appendChild(passBtn);
    actions.appendChild(likeBtn);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(bio);
    card.appendChild(actions);

    return card;
  }

  try {
    const res = await fetch('/api/profiles');
    const profiles = await res.json();
    profiles.forEach(profile => container.appendChild(createCard(profile)));
  } catch (err) {
    console.error('Failed to load profiles:', err);
  }
});
/***************************/