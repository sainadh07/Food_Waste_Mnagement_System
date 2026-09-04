const app = document.getElementById('app');
const state = {
  registerRole: 'donor',
  loginRole: 'donor',
  profileMessage: ''
};

const routes = {
  '/': 'home',
  '/about': 'about',
  '/how-it-works': 'how-it-works',
  '/impact': 'impact',
  '/contact': 'contact',
  '/login': 'login',
  '/register': 'register',
  '/donor/dashboard': 'donor-dashboard',
  '/donor/create-donation': 'donor-create',
    '/donor/create-donation/preview': 'donor-preview',
  '/donor/donations': 'donor-donations',
  '/donor/requests': 'donor-requests',
  '/donor/active': 'donor-active',
  '/donor/history': 'donor-history',
  '/donor/notifications': 'donor-notifications',
  '/donor/impact': 'donor-impact',
  '/donor/profile': 'donor-profile',
  '/donor/settings': 'donor-settings',
  '/donor/report-issue': 'donor-report-issue',
  '/ngo/dashboard': 'ngo-dashboard',
  '/ngo/nearby': 'ngo-nearby',
  '/ngo/requests': 'ngo-requests',
  '/ngo/collections': 'ngo-collections',
  '/ngo/distribution': 'ngo-distribution',
  '/ngo/completed': 'ngo-completed',
  '/ngo/notifications': 'ngo-notifications',
  '/ngo/impact': 'ngo-impact',
  '/ngo/profile': 'ngo-profile',
  '/ngo/settings': 'ngo-settings',
  '/ngo/report-issue': 'ngo-report-issue',
  '/admin/dashboard': 'admin-dashboard'
};

const donorDonations = [
  { id: '#DS-2048', item: 'Fresh Sandwiches', quantity: '48 boxes', status: 'Accepted', date: 'Today', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=180&q=80' },
  { id: '#DS-2051', item: 'Vegetable Rice', quantity: '30 trays', status: 'Pending', date: '2 days ago', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=180&q=80' },
  { id: '#DS-2057', item: 'Fruit Packs', quantity: '80 packs', status: 'Completed', date: '5 days ago', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=180&q=80' }
];

const ngoListings = [
  { id: '#FD-181', title: 'Fresh breakfast trays', donor: 'Harbor Bistro', pickup: '2.4 km away', time: '6:30 PM', qty: '36 meals', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80' },
  { id: '#FD-182', title: 'Cooked rice and curries', donor: 'Sunrise Hostel', pickup: '3.1 km away', time: '7:15 PM', qty: '24 meals', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80' },
  { id: '#FD-185', title: 'Fruit packs and salads', donor: 'City Center Hotel', pickup: '4.7 km away', time: '8:00 PM', qty: '50 meals', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' }
];

const ngoRequests = [
  { id: '#FD-181', food: 'Fresh breakfast trays', donor: 'Harbor Bistro', status: 'Pending', time: '12 min ago', pickup: 'Today, 6:30 PM' },
  { id: '#FD-176', food: 'Packaged lunch boxes', donor: 'Northside Canteen', status: 'Accepted', time: 'Yesterday', pickup: 'Today, 4:00 PM' },
  { id: '#FD-169', food: 'Bakery assortment', donor: 'West End Hotel', status: 'Rejected', time: 'Aug 28, 2026', pickup: 'Aug 28, 7:00 PM' }
];

const ngoCompleted = [
  { food: 'Vegetable rice and curry', donor: 'Sunrise Hostel', quantity: '24 trays', date: 'Aug 29, 2026', servings: '96', location: 'Downtown shelter' },
  { food: 'Fruit packs and salads', donor: 'City Center Hotel', quantity: '50 packs', date: 'Aug 25, 2026', servings: '50', location: 'Community pantry' },
  { food: 'Fresh sandwiches', donor: 'Harbor Bistro', quantity: '36 boxes', date: 'Aug 20, 2026', servings: '72', location: 'Evening meal program' }
];

const ngoNotifications = [
  { title: 'New nearby donation available.', detail: '36 breakfast trays are 2.4 km from your service area.', time: '8 min ago', unread: true },
  { title: 'Your request was accepted.', detail: 'Northside Canteen confirmed your packaged lunch pickup.', time: 'Yesterday', unread: true },
  { title: 'Pickup reminder.', detail: 'Arrive at Harbor Bistro before 6:30 PM today.', time: 'Yesterday', unread: false }
];

const donorRequests = [
  { ngo: 'Hope Food Collective', verified: true, location: 'Downtown District', distance: '2.8 km', donation: 'Fresh Sandwiches', time: '12 min ago', pickup: 'Today, 6:30 PM', message: 'We can collect and distribute these meals through our evening shelter program.', contact: '+1 (415) 555-0198' },
  { ngo: 'Community Table Network', verified: true, location: 'Mission District', distance: '4.1 km', donation: 'Fresh Sandwiches', time: '28 min ago', pickup: 'Today, 7:00 PM', message: 'Our volunteers are nearby and ready to coordinate a quick pickup.', contact: '+1 (415) 555-0166' }
];

const donorHistory = [
  { food: 'Fruit Packs', category: 'Fruits', quantity: '80 packs', date: 'Aug 28, 2026', ngo: 'Hope Food Collective', servings: '80', impact: '80 meals provided', status: 'Completed' },
  { food: 'Vegetable Rice', category: 'Cooked Meals', quantity: '30 trays', date: 'Aug 19, 2026', ngo: 'Community Table Network', servings: '120', impact: '120 meals provided', status: 'Completed' },
  { food: 'Bakery Assortment', category: 'Bakery Items', quantity: '24 boxes', date: 'Aug 06, 2026', ngo: 'City Relief Kitchen', servings: '96', impact: '96 meals provided', status: 'Completed' }
];

const donorNotifications = [
  { title: 'Your donation has received a request.', detail: 'Hope Food Collective requested Fresh Sandwiches.', time: '12 min ago', unread: true },
  { title: 'Pickup has been scheduled.', detail: 'Fruit Packs will be collected today at 6:30 PM.', time: 'Yesterday', unread: true },
  { title: 'The NGO has collected your donation.', detail: 'Your Vegetable Rice donation reached Community Table Network.', time: 'Aug 19, 2026', unread: false }
];

const impactStats = [
  ['12.4K', 'Meals Saved', 'Sample data'],
  ['1,860', 'Food Donations', 'Sample data'],
  ['430', 'Active Donors', 'Sample data'],
  ['48', 'Partner NGOs', 'Sample data'],
  ['68%', 'Food Waste Reduced', 'Sample data']
];

const faqItems = [
  ['Who can donate food?', 'Anyone with surplus food can register as a donor, including restaurants, hotels, schools, homes, and event organizers.'],
  ['How do NGOs receive donations?', 'NGOs can review nearby listings and request or accept donations from the platform before collection.'],
  ['How is the platform managed?', 'Admins monitor activity, review reports, and maintain a trusted donation network.']
];

const demoUsers = {
  donor: { id: 'donor-01', role: 'donor', name: 'Aisha Rahman', email: 'donor@foodshare.com' },
  ngo: { id: 'ngo-01', role: 'ngo', name: 'Hope Food Collective', email: 'ngo@foodshare.com' },
  admin: { id: 'admin-01', role: 'admin', name: 'Platform Administrator', email: 'admin@foodshare.com' }
};

function getCurrentUser() {
  try {
    const raw = localStorage.getItem('foodshareUser');
    const user = raw ? JSON.parse(raw) : null;
    const registeredDonor = getRegisteredDonor();
    return user?.role === 'donor' && registeredDonor ? { ...user, ...registeredDonor } : user;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem('foodshareUser', JSON.stringify(user));
  if (user?.role === 'donor') localStorage.setItem('foodshareRegisteredDonor', JSON.stringify(user));
}

function getRegisteredAccounts() {
  try {
    return JSON.parse(localStorage.getItem('foodshareAccounts') || '[]');
  } catch {
    return [];
  }
}

function saveRegisteredAccount(account) {
  const accounts = getRegisteredAccounts().filter((item) => item.email !== account.email);
  accounts.push(account);
  localStorage.setItem('foodshareAccounts', JSON.stringify(accounts));
}

function getNgoRequests() {
  try {
    return JSON.parse(localStorage.getItem('foodshareNgoRequests') || '[]');
  } catch {
    return [];
  }
}

function getRegisteredDonor() {
  try {
    const raw = localStorage.getItem('foodshareRegisteredDonor');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getDonorRecords() {
  try {
    const raw = localStorage.getItem('foodshareDonations');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDonorRecord(record) {
  const records = getDonorRecords();
  records.unshift(record);
  localStorage.setItem('foodshareDonations', JSON.stringify(records));
}

function logoutUser() {
  localStorage.removeItem('foodshareUser');
  navigateTo('/');
}

function navigateTo(pathname) {
  const next = pathname.startsWith('/') ? pathname : `/${pathname}`;
  window.history.pushState({}, '', next);
  render();
}

function navLink(path, label) {
  return `<a href="${path}" class="nav-link ${window.location.pathname === path ? 'active' : ''}">${label}</a>`;
}

function navActions(currentUser) {
  if (currentUser) {
    const dashboard = currentUser.role === 'donor' ? '/donor/dashboard' : currentUser.role === 'ngo' ? '/ngo/dashboard' : '/admin/dashboard';
    return `
      <div class="nav-actions">
        <a class="btn btn-secondary btn-small" href="${dashboard}">Dashboard</a>
        <button class="btn btn-primary btn-small" type="button" data-action="logout">Logout</button>
      </div>
    `;
  }

  const isAuthPage = ['/login', '/register'].includes(window.location.pathname);
  return `
    <div class="nav-actions">
      ${!isAuthPage ? '<a class="btn btn-secondary btn-small" href="/login">Sign In</a>' : ''}
      <a class="btn btn-primary btn-small" href="/register">Register</a>
    </div>
  `;
}

function getPageTemplate() {
  const currentUser = getCurrentUser();
  const isPublicRoute = ['/','/about','/how-it-works','/impact','/contact','/login','/register'].includes(window.location.pathname);

  if (!isPublicRoute && !currentUser) {
    return loginPage();
  }

  const route = routes[window.location.pathname] || 'home';

  if (route === 'home') return homePage(currentUser);
  if (route === 'about') return aboutPage(currentUser);
  if (route === 'how-it-works') return howItWorksPage(currentUser);
  if (route === 'impact') return impactPage(currentUser);
  if (route === 'contact') return contactPage(currentUser);
  if (route === 'login') return loginPage(currentUser);
  if (route === 'register') return registerPage(currentUser);
  if (route === 'donor-dashboard') return donorDashboard(currentUser);
  if (route === 'donor-create') return donorCreatePage(currentUser);
  if (route === 'donor-preview') return donorPreviewPage(currentUser);
  if (route === 'donor-donations') return donorDonationsPage(currentUser);
  if (route === 'donor-requests') return donorRequestsPage(currentUser);
  if (route === 'donor-active') return donorActivePage(currentUser);
  if (route === 'donor-history') return donorHistoryPage(currentUser);
  if (route === 'donor-notifications') return donorNotificationsPage(currentUser);
  if (route === 'donor-impact') return donorImpactPage(currentUser);
  if (route === 'donor-profile') return donorProfilePage(currentUser);
  if (route === 'donor-settings') return donorSettingsPage(currentUser);
  if (route === 'donor-report-issue') return donorReportIssuePage(currentUser);
  if (route === 'ngo-dashboard') return ngoDashboard(currentUser);
  if (route === 'ngo-nearby') return ngoNearbyPage(currentUser);
  if (route === 'ngo-requests') return ngoRequestsPage(currentUser);
  if (route === 'ngo-collections') return ngoCollectionsPage(currentUser);
  if (route === 'ngo-distribution') return ngoDistributionPage(currentUser);
  if (route === 'ngo-completed') return ngoCompletedPage(currentUser);
  if (route === 'ngo-notifications') return ngoNotificationsPage(currentUser);
  if (route === 'ngo-impact') return ngoImpactPage(currentUser);
  if (route === 'ngo-profile') return ngoProfilePage(currentUser);
  if (route === 'ngo-settings') return ngoSettingsPage(currentUser);
  if (route === 'ngo-report-issue') return ngoReportIssuePage(currentUser);
  if (route === 'admin-dashboard') return adminDashboard(currentUser);
  return homePage(currentUser);
}

function render() {
  const content = getPageTemplate();
  app.innerHTML = content;
  bindActions();
}

function bindActions() {
  document.querySelectorAll('[data-action="logout"]').forEach((button) => {
    button.addEventListener('click', () => logoutUser());
  });

  document.querySelectorAll('[data-nav]').forEach((button) => {
    button.addEventListener('click', () => navigateTo(button.dataset.nav));
  });

  document.querySelectorAll('[data-role-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const role = button.dataset.roleToggle;
      const path = window.location.pathname;

      if (path === '/register') {
        state.registerRole = role;
      }

      if (path === '/login') {
        state.loginRole = role;
      }

      render();
    });
  });

  document.querySelectorAll('[data-toggle-password]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.togglePassword);
      if (!input) return;
      const isVisible = input.type === 'text';
      input.type = isVisible ? 'password' : 'text';
      button.textContent = isVisible ? 'Show' : 'Hide';
      button.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
    });
  });

  const registerForm = document.querySelector('[data-register-form]');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(registerForm).entries());
      const email = (values.email || '').trim().toLowerCase();
      const password = values.password || '';
      const credentialError = validateAuthCredentials(email, password);
      if (credentialError) {
        showAuthMessage(credentialError);
        return;
      }
      const existingAccount = getRegisteredAccounts().find((account) => account.email === email);
      if (existingAccount) {
        showAuthMessage('An account with this email already exists. Please sign in.');
        return;
      }
      if (values.password !== values.confirmPassword) {
        showAuthMessage('Passwords do not match.');
        return;
      }
      const account = {
        id: `${state.registerRole}-${Date.now()}`,
        role: state.registerRole,
        name: values.fullName || values.ngoName || 'New account',
        email,
        password,
        phone: values.phone || values.phoneNumber || '',
        donorType: values.donorType || '',
        address: values.address || '',
        location: values.location || '',
        ngoId: values.ngoId || '',
        contactPerson: values.contactPerson || '',
        verificationStatus: state.registerRole === 'ngo' ? 'Verified' : ''
      };
      try {
        await apiRequest('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            role: account.role,
            name: account.name,
            email: account.email,
            password: account.password,
            phone: account.phone,
            donorType: account.donorType,
            ngoId: account.ngoId,
            contactPerson: account.contactPerson,
            address: account.address,
            location: account.location
          })
        });
        state.loginRole = account.role;
        navigateTo('/login');
      } catch (error) {
        showAuthMessage(error.message);
      }
    });
  }

  const donationForm = document.querySelector('[data-donation-form]');
  if (donationForm) {
    const deadline = donationForm.querySelector('input[name="deadline"]');
    if (deadline) {
      const minimumDeadline = new Date(Date.now() + 60 * 60 * 1000);
      minimumDeadline.setMinutes(minimumDeadline.getMinutes() - minimumDeadline.getTimezoneOffset());
      deadline.min = minimumDeadline.toISOString().slice(0, 16);
    }
    donationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const isDraft = event.submitter?.dataset.saveDraft !== undefined;
      const deadline = donationForm.querySelector('input[name="deadline"]');
      if (!isDraft && deadline && deadline.value && new Date(deadline.value) <= new Date()) {
        deadline.setCustomValidity('Choose a future safe consumption deadline.');
      } else if (deadline) {
        deadline.setCustomValidity('');
      }
      if (!isDraft && !donationForm.checkValidity()) {
        const firstInvalid = donationForm.querySelector(':invalid');
        const formMessage = donationForm.querySelector('[data-form-message]');
        if (formMessage) formMessage.textContent = firstInvalid === deadline ? 'Please choose a future Safe until / deadline before posting.' : 'Please complete the highlighted required fields before posting.';
        firstInvalid?.focus();
        return;
      }
      const values = Object.fromEntries(new FormData(donationForm).entries());
      const donor = getCurrentUser();
      const record = { ...values, id: `#DS-${Date.now().toString().slice(-4)}`, donorId: donor?.id, donorName: donor?.name, createdAt: new Date().toLocaleDateString(), status: 'Available', requests: 0 };
      if (isDraft) {
        record.status = 'Draft';
        saveDonorRecord(record);
        navigateTo('/donor/donations');
        return;
      }
      saveDonorRecord(record);
      navigateTo('/donor/active');
    });
  }

  const imageInput = document.querySelector('[data-image-input]');
  const imagePreview = document.querySelector('[data-image-preview]');
  if (imageInput && imagePreview) {
    imageInput.addEventListener('change', () => {
      imagePreview.innerHTML = Array.from(imageInput.files).slice(0, 5).map((file) => `<div class="preview-image"><img src="${URL.createObjectURL(file)}" alt="Donation preview" /><button type="button" aria-label="Remove image">&times;</button></div>`).join('');
    });
  }

  const publishButton = document.querySelector('[data-publish-donation]');
  if (publishButton) {
    publishButton.addEventListener('click', () => {
      let preview = {};
      try { preview = JSON.parse(sessionStorage.getItem('foodshareDonationPreview') || '{}'); } catch { preview = {}; }
      if (preview.foodName) saveDonorRecord({ ...preview, status: 'Available', publishedAt: new Date().toLocaleDateString() });
      sessionStorage.removeItem('foodshareDonationPreview');
      navigateTo('/donor/active');
    });
  }

  document.querySelectorAll('[data-request-donation]').forEach((button) => {
    button.addEventListener('click', () => openNgoRequestModal(button.closest('.ngo-food-card')?.querySelector('h3')?.textContent || 'Available donation'));
  });

  const profileForm = document.querySelector('[data-profile-form]');
  if (profileForm) {
    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(profileForm).entries());
      const currentUser = getCurrentUser();
      const updatedUser = { ...currentUser, name: values.fullName, email: values.email, phone: values.phone, donorType: values.donorType, address: values.address, location: values.location };
      setCurrentUser(updatedUser);
      localStorage.setItem('foodshareRegisteredDonor', JSON.stringify(updatedUser));
      state.profileMessage = 'Profile updated successfully';
      render();
    });
  }

  const loginForm = document.querySelector('[data-login-form]');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const role = state.loginRole || loginForm.dataset.role || 'donor';
      const values = Object.fromEntries(new FormData(loginForm).entries());
      const email = (values.email || '').trim().toLowerCase();
      const credentialError = validateAuthCredentials(email, values.password || '');
      if (credentialError) {
        showAuthMessage(credentialError);
        return;
      }
      try {
        const result = await apiRequest('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password: values.password, role })
        });
        setCurrentUser(result.user);
        navigateTo(role === 'donor' ? '/donor/dashboard' : '/ngo/dashboard');
      } catch (error) {
        showAuthMessage(error.message);
      }
    });
  }
}

function showAuthMessage(message) {
  const form = document.querySelector('[data-register-form], [data-login-form]');
  if (!form) return;
  let messageNode = form.querySelector('.auth-form-message');
  if (!messageNode) {
    messageNode = document.createElement('p');
    messageNode.className = 'auth-form-message';
    form.prepend(messageNode);
  }
  messageNode.textContent = message;
}

function validateAuthCredentials(email, password) {
  if (!/^[^\s@]+@gmail\.com$/i.test(email)) return 'Please use a valid Gmail address ending with @gmail.com.';
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) return 'Password must include at least one lowercase letter and one uppercase letter.';
  return '';
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`http://localhost:5000${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'The server could not complete the request.');
  return payload;
}

function openNgoRequestModal(foodName) {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `<form class="modal-card" data-ngo-request-form><button class="modal-close" type="button" aria-label="Close">&times;</button><span class="eyebrow">Request donation</span><h2>${foodName}</h2><p>Tell the donor how your NGO will collect and distribute this food.</p><div class="field-row"><label>People your NGO expects to serve *<input name="people" type="number" min="1" placeholder="40" required /></label></div><div class="field-row two-col"><label>Pickup available from *<input name="from" type="time" required /></label><label>Pickup available until *<input name="until" type="time" required /></label></div><div class="field-row"><label>Contact person *<input name="contact" placeholder="Operations contact" required /></label></div><div class="field-row"><label>Message to donor<textarea name="message" rows="4" placeholder="We can collect this donation and distribute it to approximately 40 people."></textarea></label></div><div class="form-actions"><button class="btn btn-secondary" type="button" data-close-modal>Cancel</button><button class="btn btn-primary" type="submit">Send Request</button></div></form>`;
  document.body.appendChild(modal);
  const close = () => modal.remove();
  modal.querySelector('[data-close-modal]').addEventListener('click', close);
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const ngo = getCurrentUser();
    const requests = getNgoRequests();
    requests.unshift({ id: `#REQ-${Date.now().toString().slice(-4)}`, food: foodName, donor: 'Matched donor', status: 'Pending', time: 'Just now', pickup: `${values.from} - ${values.until}`, people: values.people, message: values.message, ngo: ngo?.name });
    localStorage.setItem('foodshareNgoRequests', JSON.stringify(requests));
    close();
    navigateTo('/ngo/requests');
  });
}

function renderPublicHeader(currentUser) {
  return `
    <header class="topbar">
      <div class="container nav-wrap">
        <a href="/" class="brand">
          <span class="brand-mark">FS</span>
          <span>FoodShare</span>
        </a>
        <nav class="main-nav" aria-label="Main navigation">
          ${navLink('/', 'Home')}
          ${navLink('/about', 'About Us')}
          ${navLink('/how-it-works', 'How It Works')}
          ${navLink('/impact', 'Impact')}
          ${navLink('/contact', 'Contact Us')}
        </nav>
        ${navActions(currentUser)}
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-wrap">
        <div>
          <div class="brand footer-brand">
            <span class="brand-mark">FS</span>
            <span>FoodShare</span>
          </div>
          <p>Connecting surplus food with trusted partners to reduce waste and strengthen communities.</p>
        </div>
        <div class="footer-links">
          <a href="/about">About</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  `;
}

function homePage(currentUser) {
  return `
    ${renderPublicHeader(currentUser)}
    <main>
      <section class="hero-section">
        <div class="container hero-grid">
          <div class="hero-content">
            <span class="eyebrow">Food waste reduction platform</span>
            <h1>Turn Surplus Food Into Meaningful Impact.</h1>
            <p>Connect surplus food with trusted NGOs and help reduce food waste while feeding communities in need.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/register">Donate Food</a>
              <a class="btn btn-secondary" href="/register">Join as NGO</a>
            </div>
            <div class="trust-row">
              <span>✔ Verified partners</span>
              <span>✔ Local coordination</span>
              <span>✔ Community impact</span>
            </div>
          </div>
          <div class="hero-visual">
            <div class="visual-card">
              <div class="mini-badge">+ 2,480 meals saved</div>
              <div class="food-visual">
                <div class="plate"></div>
                <div class="leaf leaf-one"></div>
                <div class="leaf leaf-two"></div>
              </div>
            </div>
            <div class="floating-card floating-top"><strong>48</strong><span>Partner NGOs</span></div>
            <div class="floating-card floating-bottom"><strong>68%</strong><span>Waste reduced</span></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container split-panel">
          <div class="panel-visual"><div class="photo-panel"><img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=85" alt="Fresh produce prepared for donation" /><div class="photo-caption"><strong>Good food deserves a second destination.</strong><span>Every listing helps a local partner act before it becomes waste.</span></div></div></div>
          <div class="panel-copy">
            <span class="eyebrow">The problem</span>
            <h2>Too Much Food Is Wasted. Too Many People Go Hungry.</h2>
            <p>Large amounts of safe surplus food can go to waste from households, restaurants, hostels, events, institutions, and organizations while many people lack sufficient food. FoodShare bridges that gap by connecting donors and NGOs.</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading">
            <span class="eyebrow">How it works</span>
            <h2>Simple steps with a real impact</h2>
          </div>
          <div class="steps-grid">
            <div class="step-card"><div class="icon-wrap">1</div><h3>Donate</h3><p>Donors post surplus food with details on quantity, timing, and pickup.</p></div>
            <div class="step-card"><div class="icon-wrap">2</div><h3>Connect</h3><p>Nearby NGOs discover suitable food donations and respond to relevant requests.</p></div>
            <div class="step-card"><div class="icon-wrap">3</div><h3>Collect</h3><p>NGOs accept the donation and arrange collection with clear coordination.</p></div>
            <div class="step-card"><div class="icon-wrap">4</div><h3>Serve</h3><p>Food is distributed to people in need through trusted local channels.</p></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading">
            <span class="eyebrow">Our ecosystem</span>
            <h2>Built around the three roles that drive impact</h2>
          </div>
          <div class="role-grid">
            <div class="role-card"><div class="role-icon">🤝</div><h3>Donors</h3><p>Share your surplus food and help prevent usable food from going to waste.</p></div>
            <div class="role-card"><div class="role-icon">🏘️</div><h3>NGOs</h3><p>Connect with nearby food donors and help distribute surplus food to communities in need.</p></div>
            <div class="role-card"><div class="role-icon">🛡️</div><h3>Admin</h3><p>Monitor, manage, verify, and maintain a trusted food donation ecosystem.</p></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading">
            <span class="eyebrow">Impact</span>
            <h2>Measurable difference for people and communities</h2>
          </div>
          <div class="stats-grid">
            ${impactStats.map(([value, label, note]) => `
              <div class="stat-card">
                <strong>${value}</strong>
                <span>${label}</span>
                <small>${note}</small>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container trust-grid">
          <div>
            <span class="eyebrow">Trust & safety</span>
            <h2>A safer and more trustworthy donation ecosystem</h2>
          </div>
          <div class="trust-list">
            ${['Verified NGO partner network','Transparent donation details','Pickup coordination and tracking','User reporting and admin oversight','Clear food information sharing'].map((point) => `
              <div class="trust-item"><span class="check">✓</span><span>${point}</span></div>
            `).join('')}
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}
  `;
}

function aboutPage(currentUser) {
  return `
    ${renderPublicHeader(currentUser)}
    <main class="page-shell">
      <div class="container narrow-page">
        <span class="eyebrow">About us</span>
        <h1>Reducing waste, strengthening communities.</h1>
        <p>FoodShare was created to address a simple but urgent challenge: safe surplus food is often discarded even when it could nourish someone in need. Our mission is to connect donors with trusted NGOs so surplus food can be redistributed responsibly.</p>
        <div class="info-block"><h3>Why this matters</h3><p>Households, restaurants, hotels, event organizers, hostels, and institutions often have food left over at the end of the day. Without a connected system, this food can end up in waste streams while many people remain food insecure.</p></div>
        <div class="info-block"><h3>Our mission</h3><p>“Our mission is to create a connected ecosystem where surplus food can reach people who need it instead of becoming waste.”</p></div>
        <div class="info-block"><h3>How we work together</h3><p>Donors upload food details, NGOs review nearby opportunities, and the platform streamlines collection and distribution through a transparent, community-centered workflow.</p></div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function howItWorksPage(currentUser) {
  return `
    ${renderPublicHeader(currentUser)}
    <main class="page-shell">
      <div class="container narrow-page">
        <span class="eyebrow">How it works</span>
        <h1>A clear process for donors, NGOs, and admins.</h1>
        <div class="timeline-block"><h3>For Donors</h3><ol><li>Register and choose the donor account type.</li><li>Create a donation listing with food details and pickup information.</li><li>Add quantity, preparation time, and safe consumption details.</li><li>Wait for NGO requests or accepted collection offers.</li><li>Confirm handover and track the donation status.</li></ol></div>
        <div class="timeline-block"><h3>For NGOs</h3><ol><li>Register and complete the verification process.</li><li>Discover nearby donation opportunities.</li><li>Request or accept suitable donations.</li><li>Collect food and arrange logistics.</li><li>Distribute meals and update donation status.</li></ol></div>
        <div class="timeline-block"><h3>For Admin</h3><ol><li>Verify users and organizations.</li><li>Monitor active and completed donations.</li><li>Manage user accounts and reports.</li><li>Track platform activity and impact.</li><li>Analyze network health and system performance.</li></ol></div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function impactPage(currentUser) {
  return `
    ${renderPublicHeader(currentUser)}
    <main class="page-shell">
      <div class="container">
        <div class="section-heading center">
          <span class="eyebrow">Impact dashboard</span>
          <h1>Sample impact indicators</h1>
        </div>
        <div class="stats-grid">
          ${impactStats.map(([value, label, note]) => `
            <div class="stat-card">
              <strong>${value}</strong>
              <span>${label}</span>
              <small>${note}</small>
            </div>
          `).join('')}
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function contactPage(currentUser) {
  return `
    ${renderPublicHeader(currentUser)}
    <main class="page-shell">
      <div class="container contact-layout">
        <div class="contact-copy">
          <span class="eyebrow">Contact us</span>
          <h1>We’d love to hear from you.</h1>
          <p>Whether you’re a donor, an NGO, or a community partner, we’re here to help build a more sustainable food ecosystem.</p>
          <div class="contact-details">
            <div><strong>Email:</strong> hello@foodshare.org</div>
            <div><strong>Phone:</strong> +1 (415) 555-0148</div>
            <div><strong>Location:</strong> 14 Greenway Avenue, San Francisco, CA</div>
          </div>
          <div class="faq-box">
            <h3>Support</h3>
            ${faqItems.map(([q, a]) => `<div class="faq-item"><strong>${q}</strong><p>${a}</p></div>`).join('')}
          </div>
        </div>
        <form class="form-card contact-form">
          <div class="field-row"><label>Name<input type="text" placeholder="Your name" /></label></div>
          <div class="field-row"><label>Email<input type="email" placeholder="you@example.com" /></label></div>
          <div class="field-row"><label>Subject<input type="text" placeholder="How can we help?" /></label></div>
          <div class="field-row"><label>Message<textarea rows="5" placeholder="Write your message here"></textarea></label></div>
          <button type="button" class="btn btn-primary full-width">Send Message</button>
        </form>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function registerPage(currentUser) {
  const role = state.registerRole || 'donor';
  const details = role === 'ngo' ? `
    <div class="field-row two-col">
      <label>NGO Name<input name="ngoName" type="text" placeholder="Organization name" required /></label>
      <label>Registration / NGO ID<input name="ngoId" type="text" placeholder="Official registration ID" required /></label>
    </div>
    <div class="field-row three-col">
      <label>Contact Person<input name="contactPerson" type="text" placeholder="Operations contact" required /></label>
      <label>Email<input name="email" type="email" placeholder="hello@ngo.org" required /></label>
      <label>Phone Number<input name="phone" type="tel" placeholder="+1 555 000 0000" required /></label>
    </div>
    <div class="field-row two-col">
      <label>Location<input name="location" type="text" placeholder="City or region" required /></label>
      <label>Address<input name="address" type="text" placeholder="Street address" required /></label>
    </div>
    <div class="field-row two-col">
      <label>Password<div class="password-field"><input id="ngo-password" name="password" type="password" placeholder="Create a password" required /><button type="button" data-toggle-password="ngo-password" aria-label="Show password">Show</button></div></label>
      <label>Confirm Password<div class="password-field"><input id="ngo-confirm-password" name="confirmPassword" type="password" placeholder="Repeat your password" required /><button type="button" data-toggle-password="ngo-confirm-password" aria-label="Show password">Show</button></div></label>
    </div>
    <div class="auth-requirements"><strong>Account requirements</strong><label><input type="checkbox" disabled /> Use a Gmail address ending with @gmail.com</label><label><input type="checkbox" disabled /> Include at least one lowercase and one uppercase letter</label></div>
  ` : `
    <div class="field-row two-col">
      <label>Full Name<input name="fullName" type="text" placeholder="Your name" required /></label>
      <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
    </div>
    <div class="field-row two-col">
      <label>Phone Number<input name="phone" type="tel" placeholder="+1 555 000 0000" required /></label>
      <label>Donor Type<select name="donorType"><option>Individual</option><option>Restaurant</option><option>Hotel</option><option>Hostel</option><option>Canteen</option><option>Event Organizer</option><option>Company</option><option>School/College</option><option>Other Organization</option></select></label>
    </div>
    <div class="field-row two-col">
      <label>Password<div class="password-field"><input id="donor-password" name="password" type="password" placeholder="Create a password" required /><button type="button" data-toggle-password="donor-password" aria-label="Show password">Show</button></div></label>
      <label>Confirm Password<div class="password-field"><input id="donor-confirm-password" name="confirmPassword" type="password" placeholder="Repeat your password" required /><button type="button" data-toggle-password="donor-confirm-password" aria-label="Show password">Show</button></div></label>
    </div>
    <div class="auth-requirements"><strong>Account requirements</strong><label><input type="checkbox" disabled /> Use a Gmail address ending with @gmail.com</label><label><input type="checkbox" disabled /> Include at least one lowercase and one uppercase letter</label></div>
  `;

  return `
    ${renderPublicHeader(currentUser)}
    <main class="auth-page">
      <div class="auth-aside auth-register-aside"><span class="eyebrow">Join FoodShare</span><h2>Make surplus matter.</h2><p>Build a trusted connection between good food and the people who need it.</p><div class="auth-aside-stat"><strong>12.4K</strong><span>meals already redirected from waste</span></div></div>
      <div class="auth-card">
        <div class="auth-header"><span class="eyebrow">Create account</span><h1>Start making an impact.</h1><p>Choose how you will contribute to the FoodShare community.</p></div>
        <div class="role-toggle">
          <button type="button" class="toggle-btn ${role === 'donor' ? 'active' : ''}" data-role-toggle="donor">Donor</button>
          <button type="button" class="toggle-btn ${role === 'ngo' ? 'active' : ''}" data-role-toggle="ngo">NGO</button>
        </div>
        <form class="form-card inner-form" data-register-form>
          ${details}
          <button class="btn btn-primary full-width" type="submit">Create Account</button>
          <p class="auth-switch">Already have an account? <a href="/login">Sign in</a></p>
        </form>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function loginPage(currentUser) {
  const role = currentUser ? currentUser.role : state.loginRole || 'donor';
  return `
    ${renderPublicHeader(currentUser)}
    <main class="auth-page">
      <div class="auth-aside auth-login-aside"><span class="eyebrow">Welcome back</span><h2>Your impact continues here.</h2><p>Pick up where you left off and keep good food moving through your community.</p><div class="auth-aside-quote">“Small acts of coordination become meaningful community change.”</div></div>
      <div class="auth-card">
        <div class="auth-header"><span class="eyebrow">Secure access</span><h1>Welcome back.</h1><p>Sign in to manage your donations and community work.</p></div>
        <div class="role-toggle">
          <button type="button" class="toggle-btn ${role === 'donor' ? 'active' : ''}" data-role-toggle="donor">Donor</button>
          <button type="button" class="toggle-btn ${role === 'ngo' ? 'active' : ''}" data-role-toggle="ngo">NGO</button>
        </div>
        <form class="form-card inner-form" data-login-form data-role="${role}">
          <div class="field-row"><label>Email<input type="email" name="email" placeholder="${role === 'ngo' ? 'ngo@foodshare.com' : role === 'admin' ? 'admin@foodshare.com' : 'donor@foodshare.com'}" required /></label></div>
          <div class="field-row"><label>Password<div class="password-field"><input id="login-password" type="password" name="password" placeholder="Enter your password" required /><button type="button" data-toggle-password="login-password" aria-label="Show password">Show</button></div></label></div>
          <div class="auth-requirements compact-requirements"><strong>Sign-in requirements</strong><label><input type="checkbox" disabled /> Gmail address ending with @gmail.com</label><label><input type="checkbox" disabled /> Password includes lowercase and uppercase letters</label></div>
          <div class="field-row compact-row"><label class="checkbox-row"><input type="checkbox" />Remember Me</label><a href="/login">Forgot Password?</a></div>
          <button class="btn btn-primary full-width" type="submit">Sign In</button>
          <p class="auth-switch">Don’t have an account? <a href="/register">Register</a></p>
        </form>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function dashboardShell(title, subtitle, user, children) {
  const roleNav = {
    donor: [
      ['Dashboard', 'Overview', '/donor/dashboard'], ['Create Donation', 'Start a new listing', '/donor/create-donation'], ['My Donations', 'Track shared food', '/donor/donations'],
      ['Active Donations', 'Pickup tracking', '/donor/active'], ['Donation History', 'Completed impact', '/donor/history'],
      ['Notifications', 'Updates', '/donor/notifications'], ['Impact', 'Your contribution', '/donor/impact'], ['Profile', 'Account details', '/donor/profile'], ['Settings', 'Preferences', '/donor/settings'], ['Logout', '']
    ],
    ngo: [
      ['Dashboard', 'Operations', '/ngo/dashboard'], ['Nearby Donations', 'Find surplus food', '/ngo/nearby'], ['Donation Requests', 'Request status', '/ngo/requests'],
      ['Active Collections', 'Pickup schedule', '/ngo/collections'], ['Distribution', 'Record impact', '/ngo/distribution'], ['Completed Donations', 'Impact history', '/ngo/completed'],
      ['Notifications', 'Updates', '/ngo/notifications'], ['Impact', 'Community reach', '/ngo/impact'], ['Profile', 'Organization details', '/ngo/profile'], ['Settings', 'Preferences', '/ngo/settings'], ['Report Issue', 'Contact admin', '/ngo/report-issue'], ['Logout', '']
    ],
    admin: [['Dashboard', 'Platform overview', '/admin/dashboard'], ['Donors', 'Directory', '/admin/dashboard'], ['NGOs', 'Directory', '/admin/dashboard'], ['Donations', 'All activity', '/admin/dashboard'], ['Users', 'Accounts', '/admin/dashboard'], ['Reports', 'Review queue', '/admin/dashboard'], ['Notifications', 'Updates', '/admin/dashboard'], ['Analytics', 'Insights', '/admin/dashboard'], ['Settings', 'Preferences', '/admin/dashboard'], ['Logout', '']]
  };

  const notificationPath = user.role === 'donor' ? '/donor/notifications' : user.role === 'ngo' ? '/ngo/notifications' : '/admin/dashboard';

  return `
    <div class="dashboard-layout">
      <aside class="sidebar">
        <div class="brand sidebar-brand">
          <span class="brand-mark">FS</span>
          <span>FoodShare</span>
        </div>
        <ul class="sidebar-menu">
          ${roleNav[user.role].map(([label, hint, path]) => label === 'Logout' ? '<li><button type="button" class="sidebar-link danger-link" data-action="logout">Logout</button></li>' : `<li><a href="${path}" class="sidebar-link ${window.location.pathname === path ? 'active' : ''}"><strong>${label}</strong><small>${hint}</small></a></li>`).join('')}
        </ul>
      </aside>
      <main class="dashboard-main">
        <header class="dashboard-header">
          <div>
            <span class="eyebrow">${subtitle}</span>
            <h1>${title}</h1>
          </div>
          <div class="dashboard-tools">
            <label class="dashboard-search"><span>Search</span><input type="search" placeholder="Search your workspace" /></label>
            <a class="notification-button" href="${notificationPath}" aria-label="View notifications">&#9679;</a>
            <div class="dashboard-user">
            <span class="avatar">${user.name.charAt(0).toUpperCase()}</span>
            <div>
              <strong>${user.name}</strong>
              <small>${user.role === 'donor' ? 'Donor account' : user.role === 'ngo' ? 'NGO account · Verified NGO' : 'Admin account'}</small>
            </div>
            <span class="profile-chevron">&#9662;</span>
            </div>
          </div>
        </header>
        ${children}
      </main>
    </div>
  `;
}

function donorDashboard(currentUser) {
  if (!currentUser || currentUser.role !== 'donor') return loginPage();
  return `
    ${dashboardShell('Donor Dashboard', 'Overview', currentUser, `
      <section class="dashboard-hero donor-hero">
        <div><span class="eyebrow">Your giving workspace</span><h2>Keep good food moving.</h2><p>Publish surplus, coordinate pickups, and see the community value of every donation.</p><a class="btn btn-primary" href="/donor/create-donation">+ Create Donation</a></div>
        <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" alt="Fresh prepared food ready to share" />
      </section>
      <div class="quick-actions">
        <a class="quick-action primary-action" href="/donor/create-donation"><strong>+ Create Donation</strong><span>Share surplus food in a few steps</span></a>
        <a class="quick-action" href="/donor/active"><strong>Track Active Donation</strong><span>See your next collection</span></a>
      </div>
      <div class="dashboard-grid five-up">
        <div class="summary-card donor-metric"><span>Total donations</span><strong>35</strong><small>All listings created</small></div>
        <div class="summary-card donor-metric"><span>Active listings</span><strong>08</strong><small>Visible to nearby NGOs</small></div>
        <div class="summary-card donor-metric"><span>Completed</span><strong>27</strong><small>Successful handoffs</small></div>
        <div class="summary-card donor-metric"><span>Meals contributed</span><strong>1,280</strong><small>Estimated servings</small></div>
        <div class="summary-card donor-metric"><span>Food saved</span><strong>320 kg</strong><small>Redistributed, not wasted</small></div>
      </div>
      <div class="content-panel">
        <div class="panel-top"><div><span class="eyebrow">Your activity</span><h3>Recent donations</h3></div><a class="btn btn-secondary btn-small" href="/donor/donations">View all donations</a></div>
        <table>
          <thead><tr><th>Donation ID</th><th>Item</th><th>Quantity</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            ${donorDonations.map((row) => `<tr><td><img class="table-thumb" src="${row.image}" alt="${row.item}" /></td><td><strong>${row.id}</strong><br /><span class="table-muted">${row.item}</span></td><td>${row.quantity}</td><td><span class="status-badge ${row.status.toLowerCase()}">${row.status}</span></td><td>${row.date}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    `)}
  `;
}

function donorWorkspacePage(currentUser, title, subtitle, content) {
  if (!currentUser || currentUser.role !== 'donor') return loginPage();
  return dashboardShell(title, subtitle, currentUser, content);
}

function donorCreatePage(currentUser) {
  return donorWorkspacePage(currentUser, 'Create Donation', 'Share surplus safely', `
    <div class="workspace-intro"><div><span class="eyebrow">New listing</span><h2>Give your surplus a second destination.</h2><p>Complete the essential food, safety, location, and pickup details so trusted NGOs can act quickly.</p></div><span class="form-step">1 of 3 &middot; Food details</span></div>
    <form class="content-panel donation-form" data-donation-form novalidate>
      <p class="form-message" data-form-message role="alert">Fields marked * are required to post a donation. Save as Draft can be used before all details are complete.</p>
      <div class="form-section"><div class="form-section-heading"><span class="form-number">01</span><div><h3>Food information</h3><p>Tell partners exactly what is available.</p></div></div>
        <div class="field-row two-col"><label>Food name/title *<input name="foodName" type="text" placeholder="e.g. Vegetable rice bowls" required /></label><label>Food category *<select name="category" required><option value="">Select category</option><option>Cooked Meals</option><option>Rice</option><option>Vegetables</option><option>Fruits</option><option>Bakery Items</option><option>Packaged Food</option><option>Dairy</option><option>Other</option></select></label></div>
        <div class="field-row three-col"><label>Food type<select name="foodType"><option>Vegetarian</option><option>Non-Vegetarian</option></select></label><label>Quantity *<input name="quantity" type="number" min="1" placeholder="30" required /></label><label>Unit<select name="unit"><option>Servings</option><option>Boxes</option><option>Trays</option><option>Kg</option><option>Packets</option></select></label></div>
        <div class="field-row two-col"><label>Number of people/servings *<input name="servings" type="number" min="1" placeholder="30" required /></label><label>Food condition<select name="condition"><option>Fresh and ready to eat</option><option>Chilled</option><option>Frozen</option><option>Packaged and sealed</option></select></label></div>
        <div class="field-row two-col"><label>Description<textarea name="description" rows="3" placeholder="Describe the food, packaging, and portion size."></textarea></label><label>Ingredients/allergens<textarea name="allergens" rows="3" placeholder="e.g. Contains dairy and wheat"></textarea></label></div>
      </div>
      <div class="form-section"><div class="form-section-heading"><span class="form-number">02</span><div><h3>Food safety information</h3><p>Accurate details help NGOs make responsible decisions.</p></div></div>
        <div class="safety-notice"><strong>Food safety responsibility</strong><p>Donors are responsible for providing accurate information about the food they donate. Only safe and suitable food should be offered for donation.</p></div>
        <div class="field-row three-col"><label>Prepared today?<select><option>Yes</option><option>No</option></select></label><label>Preparation date *<input type="date" required /></label><label>Preparation time *<input type="time" required /></label></div>
        <div class="field-row three-col"><label>Storage method<select name="storageMethod"><option>Room temperature</option><option>Refrigerated</option><option>Frozen</option><option>Insulated container</option></select></label><label>Safe until / deadline *<input name="deadline" type="datetime-local" required /><small class="field-help">Choose a future date and time.</small></label><label>Safety notes<input name="safetyNotes" type="text" placeholder="Keep chilled until pickup" /></label></div>
      </div>
      <div class="form-section"><div class="form-section-heading"><span class="form-number">03</span><div><h3>Donation location and pickup</h3><p>Make collection easy for the receiving organization.</p></div></div>
        <div class="field-row two-col"><label>Pickup address *<input type="text" placeholder="Building and street address" required /></label><label>Area/locality *<input type="text" placeholder="Neighborhood or campus" required /></label></div>
        <div class="field-row three-col"><label>City *<input type="text" placeholder="City" required /></label><label>Postal code *<input type="text" placeholder="Postal code" required /></label><button class="btn btn-secondary location-button" type="button">Use Current Location</button></div>
        <div class="field-row two-col"><label>Pickup available from *<input type="time" required /></label><label>Pickup available until *<input type="time" required /></label></div>
        <div class="field-row two-col"><label>Contact person *<input type="text" placeholder="Name at pickup point" required /></label><label>Contact phone number *<input type="tel" placeholder="+1 555 000 0000" required /></label></div>
        <div class="field-row"><label>Pickup instructions<textarea rows="3" placeholder="Food can be collected from the hostel dining hall between 7:00 PM and 8:30 PM."></textarea></label></div>
      </div>
      <div class="form-section"><div class="form-section-heading"><span class="form-number">04</span><div><h3>Food images</h3><p>Images help NGOs understand what is being offered. They do not prove food safety.</p></div></div>
        <label class="upload-zone"><input type="file" accept="image/*" multiple data-image-input /><span class="upload-icon">+</span><strong>Upload food images</strong><small>PNG or JPG, up to 5 images</small></label><div class="image-preview-grid" data-image-preview></div>
      </div>
      <div class="form-actions"><button class="btn btn-secondary" type="submit" data-save-draft>Save as Draft</button><button class="btn btn-primary" type="submit">Post Donation</button></div>
    </form>
  `);
}

function donorPreviewPage(currentUser) {
  let preview = {};
  try { preview = JSON.parse(sessionStorage.getItem('foodshareDonationPreview') || '{}'); } catch { preview = {}; }
  const foodName = preview.foodName || 'Vegetable rice bowls';
  const quantity = preview.quantity ? `${preview.quantity} ${preview.unit || 'servings'}` : '30 servings';
  return donorWorkspacePage(currentUser, 'Preview Donation', 'Review before publishing', `<div class="workspace-intro"><div><span class="eyebrow">Final review</span><h2>Everything look right?</h2><p>Review the information NGOs will see. You can edit the details or publish this donation as available.</p></div><span class="status-badge pending">Draft</span></div><article class="preview-card"><div class="preview-cover"></div><div class="preview-content"><div class="record-top"><div><span class="record-id">Food donation preview</span><h2>${foodName}</h2></div><span class="status-badge pending">Not published</span></div><div class="preview-grid"><div><span>Quantity</span><strong>${quantity}</strong></div><div><span>Servings</span><strong>${preview.servings || '30 people'}</strong></div><div><span>Food type</span><strong>${preview.foodType || 'Vegetarian'}</strong></div><div><span>Prepared</span><strong>${preview.preparationDate || 'Today'} ${preview.preparationTime || ''}</strong></div><div><span>Safe until</span><strong>${preview.deadline || 'Before pickup deadline'}</strong></div><div><span>Pickup window</span><strong>${preview.pickupStart || '7:00 PM'} - ${preview.pickupEnd || '8:30 PM'}</strong></div><div><span>Location</span><strong>${preview.address || 'Pickup address to be confirmed'}</strong></div><div><span>Donor</span><strong>${currentUser.name} &middot; ${currentUser.email}</strong></div></div><div class="safety-notice"><strong>Safety information will be shared with receiving NGOs.</strong><p>Publishing means you confirm that the information provided is accurate and that the food is safe and suitable for donation.</p></div><div class="form-actions"><a class="btn btn-secondary" href="/donor/create-donation">Edit</a><button class="btn btn-primary" type="button" data-publish-donation>Publish Donation</button></div></div></article>`);
}

function donorDonationsPage(currentUser) {
  return donorWorkspacePage(currentUser, 'My Donations', 'Manage your listings', `
    <div class="workspace-intro"><div><span class="eyebrow">Donation portfolio</span><h2>Every listing, in one place.</h2><p>Review status, requests, pickup deadlines, and the next action for each donation.</p></div><a class="btn btn-primary" href="/donor/create-donation">+ Create Donation</a></div>
    <div class="filter-bar"><input placeholder="Search donations" /><select><option>All statuses</option><option>Available</option><option>Request Received</option><option>Completed</option><option>Expired</option></select><select><option>All categories</option><option>Cooked Meals</option><option>Fruits</option><option>Bakery Items</option></select></div>
    <div class="donation-list">${[
      ['Fresh Sandwiches', '48 boxes', 'Today', 'Today, 8:30 PM', 'Harbor Bistro area', 'Request Received', '2 NGO requests'],
      ['Vegetable Rice', '30 trays', 'Aug 29, 2026', 'Aug 29, 7:30 PM', 'Downtown District', 'Accepted', '1 NGO request'],
      ['Fruit Packs', '80 packs', 'Aug 28, 2026', 'Aug 28, 9:00 PM', 'Mission District', 'Completed', '1 NGO request']
    ].map(([food, qty, date, deadline, location, status, requests], index) => `<article class="donation-record"><div class="record-image record-image-${index + 1}"></div><div class="record-main"><div class="record-top"><div><span class="record-id">#DS-20${48 + index}</span><h3>${food}</h3></div><span class="status-badge ${status.toLowerCase().replaceAll(' ', '-')}\">${status}</span></div><div class="record-meta"><span>${qty}</span><span>Posted ${date}</span><span>Deadline ${deadline}</span><span>${location}</span></div><small>${requests}</small></div><div class="record-actions"><a href="/donor/active">View</a><a href="/donor/requests">View Requests</a><button type="button">More</button></div></article>`).join('')}</div>
  `);
}

function donorRequestsPage(currentUser) {
  return donorWorkspacePage(currentUser, 'Donation Requests', 'Review partner interest', `
    <div class="workspace-intro"><div><span class="eyebrow">2 requests waiting</span><h2>Choose the right collection partner.</h2><p>Compare verified NGOs, pickup estimates, and their message before accepting a request.</p></div></div>
    <div class="request-list">${donorRequests.map((request) => `<article class="request-card"><div class="request-avatar">${request.ngo.charAt(0)}</div><div class="request-main"><div class="record-top"><div><h3>${request.ngo}</h3><span class="verified">Verified NGO</span></div><span class="table-muted">${request.time}</span></div><p><strong>${request.donation}</strong> &middot; ${request.distance} away &middot; ${request.location}</p><p class="request-message">“${request.message}”</p><div class="request-details"><span>Pickup estimate: ${request.pickup}</span><span>Completed collections: 86</span><span>Contact: ${request.contact}</span></div></div><div class="request-actions"><button class="btn btn-primary btn-small" type="button">Accept</button><button class="btn btn-secondary btn-small" type="button">Reject</button><a href="/donor/profile">View NGO</a></div></article>`).join('')}</div>
  `);
}

function donorActivePage(currentUser) {
  const postedRecords = getDonorRecords().filter((record) => record.donorId === currentUser?.id && record.status !== 'Draft');
  const recentPosted = postedRecords[0];
  const postedNotice = recentPosted ? `<article class="posted-record"><div class="posted-check">✓</div><div><strong>Recently posted: ${recentPosted.foodName || 'Food donation'}</strong><p>${recentPosted.quantity || 'Donation'} ${recentPosted.unit || ''} is now available for NGO requests.</p></div><span class="status-badge accepted">Available</span></article>` : '';
  return donorWorkspacePage(currentUser, 'Active Donations', 'Collection tracking', `
    <div class="workspace-intro"><div><span class="eyebrow">Live handoff</span><h2>Keep the collection moving.</h2><p>One accepted donation is on its way to a trusted community partner.</p></div><span class="status-badge accepted">Pickup Scheduled</span></div>
    ${postedNotice}
    <article class="tracking-card"><div class="tracking-summary"><div class="record-image record-image-1"></div><div><span class="record-id">#DS-2048</span><h3>Fresh Sandwiches</h3><p>48 boxes &middot; 48 estimated servings</p><strong>Hope Food Collective</strong><small>Pickup today, 6:30 PM - 7:00 PM</small></div></div><div class="progress-track"><div class="progress-step complete"><span>1</span><strong>Donation Accepted</strong></div><div class="progress-step current"><span>2</span><strong>Pickup Scheduled</strong></div><div class="progress-step"><span>3</span><strong>NGO On The Way</strong></div><div class="progress-step"><span>4</span><strong>Food Collected</strong></div><div class="progress-step"><span>5</span><strong>Distributed</strong></div><div class="progress-step"><span>6</span><strong>Completed</strong></div></div><div class="pickup-details"><div><span>Pickup location</span><strong>14 Greenway Avenue, loading entrance</strong></div><div><span>Contact NGO</span><strong>+1 (415) 555-0198</strong></div><div><span>Instructions</span><strong>Call reception on arrival</strong></div></div><div class="form-actions"><button class="btn btn-secondary" type="button">Contact NGO</button><a class="btn btn-secondary" href="/donor/report-issue">Report Issue</a></div></article>
  `);
}

function donorHistoryPage(currentUser) {
  return donorWorkspacePage(currentUser, 'Donation History', 'Your completed impact', `
    <div class="workspace-intro"><div><span class="eyebrow">Looking back</span><h2>Proof of the good you have done.</h2><p>Completed donations and their estimated community impact, ready to filter and export later.</p></div></div>
    <div class="filter-bar"><input type="date" aria-label="Filter from date" /><select><option>All food categories</option><option>Cooked Meals</option><option>Fruits</option><option>Bakery Items</option></select><select><option>All NGOs</option><option>Hope Food Collective</option><option>Community Table Network</option></select></div>
    <div class="content-panel history-panel"><table><thead><tr><th>Food donated</th><th>Quantity</th><th>Date</th><th>NGO</th><th>Servings</th><th>Impact</th><th>Status</th></tr></thead><tbody>${donorHistory.map((row) => `<tr><td><strong>${row.food}</strong><br /><span class="table-muted">${row.category}</span></td><td>${row.quantity}</td><td>${row.date}</td><td>${row.ngo}</td><td>${row.servings}</td><td>${row.impact}</td><td><span class="status-badge completed">${row.status}</span></td></tr>`).join('')}</tbody></table></div>
  `);
}

function donorNotificationsPage(currentUser) {
  return donorWorkspacePage(currentUser, 'Notifications', 'Stay up to date', `<div class="workspace-intro"><div><span class="eyebrow">Notification center</span><h2>Important updates, in one place.</h2><p>Requests, pickups, and completion events connected to your donations.</p></div><button class="btn btn-secondary" type="button">Mark all as read</button></div><div class="notification-list">${donorNotifications.map((item) => `<article class="notification-item ${item.unread ? 'unread' : ''}"><span class="notification-dot"></span><div><strong>${item.title}</strong><p>${item.detail}</p><small>${item.time}</small></div><button type="button" aria-label="More notification options">...</button></article>`).join('')}</div>`);
}

function donorImpactPage(currentUser) {
  return donorWorkspacePage(currentUser, 'My Impact', 'Contribution dashboard', `<div class="workspace-intro"><div><span class="eyebrow">Personal impact</span><h2>Your surplus is becoming shared meals.</h2><p>Simple estimates help you understand the reach of your donations over time.</p></div></div><div class="impact-grid"><div class="impact-big"><span>Total meals contributed</span><strong>1,280</strong><small>+18% compared with last quarter</small></div><div class="summary-card"><span>Total food donated</span><strong>320 kg</strong><small>Across 35 donations</small></div><div class="summary-card"><span>Successful donations</span><strong>27</strong><small>77% completion rate</small></div><div class="summary-card"><span>People reached</span><strong>1,060</strong><small>Estimated servings</small></div></div><div class="content-panel chart-panel"><div class="panel-top"><div><span class="eyebrow">Monthly donations</span><h3>Consistent giving creates reliable impact</h3></div><select><option>2026</option><option>2025</option></select></div><div class="impact-bars"><div style="height:42%"><span>4</span><label>Jan</label></div><div style="height:68%"><span>7</span><label>Feb</label></div><div style="height:52%"><span>5</span><label>Mar</label></div><div style="height:82%"><span>9</span><label>Apr</label></div><div style="height:64%"><span>6</span><label>May</label></div><div style="height:92%"><span>10</span><label>Jun</label></div></div></div>`);
}

function donorProfilePage(currentUser) {
  const donorType = currentUser.donorType || 'Individual';
  const initial = (currentUser.name || 'D').charAt(0).toUpperCase();
  return donorWorkspacePage(currentUser, 'Profile', 'Donor account', `<div class="workspace-intro"><div><span class="eyebrow">Account details</span><h2>Keep your donor profile current.</h2><p>Accurate contact information helps NGOs coordinate safe and timely pickups.</p></div>${state.profileMessage ? `<div class="success-message" role="status">✓ ${state.profileMessage}</div>` : ''}</div><div class="profile-layout"><div class="profile-card"><div class="profile-avatar">${initial}</div><h3>${currentUser.name}</h3><span>${donorType} donor</span><p>Member since 2026</p></div><form class="content-panel profile-form" data-profile-form><h3>Personal and pickup details</h3><div class="field-row two-col"><label>Full name<input name="fullName" value="${currentUser.name}" required /></label><label>Donor type<select name="donorType">${['Individual', 'Restaurant', 'Hotel', 'Hostel', 'Canteen', 'Event Organizer', 'Company', 'School/College', 'Other Organization'].map((type) => `<option ${donorType === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label></div><div class="field-row two-col"><label>Email<input name="email" type="email" value="${currentUser.email}" required /></label><label>Phone<input name="phone" type="tel" value="${currentUser.phone || ''}" /></label></div><div class="field-row"><label>Pickup address<input name="address" value="${currentUser.address || ''}" placeholder="Add your pickup address" /></label></div><div class="field-row two-col"><label>Area/locality<input name="location" value="${currentUser.location || ''}" placeholder="Add your area" /></label><label>City<input name="city" placeholder="City" /></label></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save Changes</button></div></form></div>`);
}

function donorSettingsPage(currentUser) {
  return donorWorkspacePage(currentUser, 'Settings', 'Account preferences', `<div class="workspace-intro"><div><span class="eyebrow">Preferences</span><h2>Make FoodShare work your way.</h2><p>Control contact details, alerts, and basic privacy choices.</p></div><button class="btn btn-primary" type="button">Save Settings</button></div><div class="settings-layout"><div class="content-panel settings-section"><h3>Notification settings</h3>${['NGO request notifications','Pickup notifications','Donation reminders','Completion notifications'].map((setting, index) => `<label class="setting-row"><span><strong>${setting}</strong><small>Receive timely updates related to your donations</small></span><input type="checkbox" ${index < 3 ? 'checked' : ''} /></label>`).join('')}</div><div class="content-panel settings-section"><h3>Account and privacy</h3><label class="field-row">Change email<input type="email" value="donor@foodshare.com" /></label><label class="field-row">Change phone<input type="tel" value="+1 (415) 555-0124" /></label><label class="setting-row"><span><strong>Profile visibility</strong><small>Only share necessary information with matched NGOs</small></span><input type="checkbox" checked /></label><a class="text-link" href="/donor/report-issue">Report a platform issue</a></div></div>`);
}

function donorReportIssuePage(currentUser) {
  return donorWorkspacePage(currentUser, 'Report an Issue', 'Support and safety', `<div class="workspace-intro"><div><span class="eyebrow">Contact admin</span><h2>Tell us what happened.</h2><p>Reports help the admin team keep donor and NGO interactions trustworthy.</p></div></div><form class="content-panel issue-form"><div class="field-row two-col"><label>Issue category<select><option>NGO behavior</option><option>Pickup problem</option><option>Incorrect information</option><option>Misuse of platform</option><option>Other</option></select></label><label>Related donation<input placeholder="e.g. #DS-2048" /></label></div><div class="field-row"><label>Description<textarea rows="7" placeholder="Describe the issue and what support you need."></textarea></label></div><label class="upload-zone compact-upload"><input type="file" accept="image/*" /><span class="upload-icon">+</span><strong>Add an optional attachment</strong><small>Images can help the admin team understand the issue</small></label><div class="form-actions"><a class="btn btn-secondary" href="/donor/dashboard">Cancel</a><button class="btn btn-primary" type="submit">Submit Report</button></div></form>`);
}

function ngoDashboard(currentUser) {
  if (!currentUser || currentUser.role !== 'ngo') return currentUser?.role === 'donor' ? donorDashboard(currentUser) : loginPage();
  return `
    ${dashboardShell('NGO Dashboard', 'Operations', currentUser, `
      <section class="dashboard-hero ngo-hero">
        <div><span class="eyebrow">Verified NGO workspace</span><h2>Available food near you.</h2><p>Discover, evaluate, request, collect, and distribute surplus food through one focused operations hub.</p><a class="btn btn-primary" href="/ngo/nearby">Browse nearby food</a></div>
        <img src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=900&q=85" alt="Community volunteers preparing food boxes" />
      </section>
      <div class="dashboard-grid six-up">
        <div class="summary-card ngo-metric"><span>Nearby donations</span><strong>24</strong><small>Within your service area</small></div>
        <div class="summary-card ngo-metric"><span>Pending requests</span><strong>06</strong><small>Awaiting donor response</small></div>
        <div class="summary-card ngo-metric"><span>Active collections</span><strong>04</strong><small>Accepted by donors</small></div>
        <div class="summary-card ngo-metric"><span>Today's schedule</span><strong>04</strong><small>Pickup slots confirmed</small></div>
        <div class="summary-card ngo-metric"><span>Completed donations</span><strong>19</strong><small>This month</small></div>
        <div class="summary-card ngo-metric"><span>Meals served</span><strong>1,280</strong><small>Community reach</small></div>
      </div>
      <div class="section-label"><span><span class="eyebrow">Act now</span><h2>Urgent donations</h2></span><a class="text-link" href="/ngo/nearby">View all nearby</a></div>
      <div class="ngo-home-grid">
        <div class="content-panel urgent-panel"><div class="panel-top"><div><span class="urgent-label">Ending soon</span><h3>Fresh breakfast trays</h3><p>36 meals from Harbor Bistro</p></div><span class="distance-badge">2.4 km</span></div><div class="urgent-meta"><span>Safe until 7:30 PM</span><span>Pickup 6:30 - 7:00 PM</span></div><a class="btn btn-primary btn-small" href="/ngo/nearby">View and request</a></div>
        <div class="content-panel schedule-panel"><div class="panel-top"><div><span class="eyebrow">Today</span><h3>Collection schedule</h3></div><a class="text-link" href="/ngo/collections">Manage</a></div><div class="schedule-row"><strong>4:00 PM</strong><span>Packaged lunch boxes</span><small>Northside Canteen</small></div><div class="schedule-row"><strong>6:30 PM</strong><span>Fresh breakfast trays</span><small>Harbor Bistro</small></div></div>
      </div>
      <div class="content-panel">
        <div class="panel-top"><div><span class="eyebrow">Discovery feed</span><h3>Nearby donations</h3></div><a class="btn btn-secondary btn-small" href="/ngo/nearby">Filter listings</a></div>
        <div class="listing-grid">
          ${ngoListings.map((item) => `
            <div class="listing-card">
              <img class="listing-image" src="${item.image}" alt="${item.title}" />
              <div class="listing-head"><span class="listing-tag">${item.id}</span><span class="listing-time">${item.time}</span></div>
              <h4>${item.title}</h4>
              <p><strong>Donor:</strong> ${item.donor}</p>
              <p><strong>Pickup:</strong> ${item.pickup}</p>
              <p><strong>Quantity:</strong> ${item.qty}</p>
              <button class="btn btn-primary btn-small" type="button">Request Donation</button>
            </div>
          `).join('')}
        </div>
      </div>
    `)}
  `;
}

function ngoWorkspacePage(currentUser, title, subtitle, content) {
  if (!currentUser || currentUser.role !== 'ngo') return currentUser?.role === 'donor' ? donorDashboard(currentUser) : loginPage();
  return dashboardShell(title, subtitle, currentUser, content);
}

function ngoNearbyPage(currentUser) {
  return ngoWorkspacePage(currentUser, 'Nearby Donations', 'Discover surplus food', `<div class="workspace-intro"><div><span class="eyebrow">Discovery engine</span><h2>Food available near your service area.</h2><p>Evaluate food, quantity, distance, deadline, and pickup window before sending a request.</p></div><span class="verified-badge">✓ Verified NGO</span></div><div class="recommendation-banner"><strong>Recommended for your NGO</strong><span>25 meal servings available 2.4 km away. Pickup is open within the next 90 minutes.</span></div><div class="filter-bar ngo-filter"><input placeholder="Search food or donor" /><select><option>Nearest</option><option>Recently Posted</option><option>Highest Quantity</option><option>Ending Soon</option></select><select><option>All distances</option><option>Within 3 km</option><option>Within 5 km</option><option>Within 10 km</option></select><select><option>All categories</option><option>Cooked Meals</option><option>Rice</option><option>Fruits</option><option>Bakery Items</option></select><select><option>Vegetarian & Non-Vegetarian</option><option>Vegetarian</option><option>Non-Vegetarian</option></select></div><div class="ngo-listing-grid">${ngoListings.map((item, index) => `<article class="ngo-food-card"><img src="${item.image}" alt="${item.title}" /><div class="ngo-food-card-body"><div class="record-top"><span class="listing-tag">${item.id}</span><span class="status-badge accepted">Available</span></div><h3>${item.title}</h3><p class="food-category">${index === 0 ? 'Cooked Meals' : index === 1 ? 'Rice' : 'Fruits'} · Vegetarian · ${item.qty}</p><div class="food-facts"><span>⏱ Prepared today, 2:10 PM</span><span>⌖ ${item.pickup}</span><span>Deadline today, 8:00 PM</span><span>Pickup ${item.time} - 7:00 PM</span></div><p class="donor-line"><strong>${item.donor}</strong> · Restaurant donor · Posted 18 min ago</p><div class="record-actions inline-actions"><button class="btn btn-secondary btn-small" type="button" data-details="${item.id}">View Details</button><button class="btn btn-primary btn-small" type="button" data-request-donation>Request Donation</button></div></div></article>`).join('')}</div>`);
}

function ngoRequestsPage(currentUser) {
  const requests = [...getNgoRequests(), ...ngoRequests];
  return ngoWorkspacePage(currentUser, 'Donation Requests', 'Track your requests', `<div class="workspace-intro"><div><span class="eyebrow">Request pipeline</span><h2>Requests awaiting a donor decision.</h2><p>Your request does not assign ownership automatically. The donor confirms the right collection partner.</p></div></div><div class="request-status-banner"><strong>Your requests are awaiting donor confirmation.</strong><span>We will notify you when a donor responds.</span></div><div class="request-list">${requests.map((request) => `<article class="request-card ngo-request"><div class="request-avatar">${request.donor.charAt(0)}</div><div class="request-main"><div class="record-top"><div><span class="record-id">${request.id}</span><h3>${request.food}</h3></div><span class="status-badge ${request.status.toLowerCase()}">${request.status}</span></div><p><strong>${request.donor}</strong> · Requested ${request.time}</p><div class="request-details"><span>Pickup: ${request.pickup}</span><span>Estimated servings: ${request.people || '40'}</span><span>Message sent to donor</span></div></div><div class="request-actions"><button class="btn btn-secondary btn-small" type="button">View Donation</button><button class="btn btn-secondary btn-small" type="button">Cancel Request</button></div></article>`).join('')}</div>`);
}

function ngoCollectionsPage(currentUser) {
  return ngoWorkspacePage(currentUser, 'Active Collections', 'Collection operations', `<div class="workspace-intro"><div><span class="eyebrow">Accepted assignments</span><h2>Plan every pickup with confidence.</h2><p>These donations have been assigned to your NGO by the donor and are ready for collection.</p></div></div><article class="tracking-card"><div class="tracking-summary"><div class="record-image record-image-2"></div><div><span class="record-id">#FD-176</span><h3>Packaged lunch boxes</h3><p>24 boxes · 48 estimated servings</p><strong>Northside Canteen</strong><small>Pickup today, 4:00 PM - 4:30 PM · 3.1 km away</small></div><span class="status-badge accepted">Pickup Scheduled</span></div><div class="progress-track ngo-progress"><div class="progress-step complete"><span>1</span><strong>Request Accepted</strong></div><div class="progress-step complete"><span>2</span><strong>Pickup Scheduled</strong></div><div class="progress-step current"><span>3</span><strong>On The Way</strong></div><div class="progress-step"><span>4</span><strong>Arrived</strong></div><div class="progress-step"><span>5</span><strong>Food Collected</strong></div><div class="progress-step"><span>6</span><strong>Distribution Started</strong></div><div class="progress-step"><span>7</span><strong>Distributed</strong></div><div class="progress-step"><span>8</span><strong>Completed</strong></div></div><div class="pickup-details"><div><span>Pickup address</span><strong>88 Market Street, loading entrance</strong></div><div><span>Donor contact</span><strong>+1 (415) 555-0134</strong></div><div><span>Representative</span><strong>Samira Khan</strong></div></div><div class="form-actions"><button class="btn btn-primary" type="button">Update: Arrived</button><button class="btn btn-secondary" type="button" data-confirm-collection>Confirm Collection</button><a class="btn btn-secondary" href="/ngo/report-issue">Report Issue</a></div></article>`);
}

function ngoDistributionPage(currentUser) {
  return ngoWorkspacePage(currentUser, 'Distribution', 'Record food impact', `<div class="workspace-intro"><div><span class="eyebrow">After collection</span><h2>Record where the food went.</h2><p>Complete the distribution record so the donor can see the real community impact.</p></div><span class="status-badge accepted">Food Collected</span></div><form class="content-panel distribution-form"><div class="form-section-heading"><span class="form-number">01</span><div><h3>Distribution details</h3><p>All fields describe this completed handoff.</p></div></div><div class="field-row three-col"><label>Servings distributed *<input type="number" min="1" placeholder="48" required /></label><label>People served *<input type="number" min="1" placeholder="40" required /></label><label>Distribution date/time *<input type="datetime-local" required /></label></div><div class="field-row two-col"><label>Distribution location *<input placeholder="Community shelter or pantry" required /></label><label>Remaining quantity<input placeholder="0 boxes" /></label></div><div class="field-row"><label>Distribution notes<textarea rows="5" placeholder="Add notes about the program, remaining portions, or special circumstances."></textarea></label></div><div class="safety-notice"><strong>Complete the workflow accurately.</strong><p>Food cannot be marked Completed until collection and distribution have both been recorded.</p></div><div class="form-actions"><button class="btn btn-primary" type="submit">Mark as Distributed</button></div></form>`);
}

function ngoCompletedPage(currentUser) {
  return ngoWorkspacePage(currentUser, 'Completed Donations', 'Donation history', `<div class="workspace-intro"><div><span class="eyebrow">Completed impact</span><h2>A record of food reaching people.</h2><p>Review completed collections, distribution details, and the donors who made them possible.</p></div></div><div class="filter-bar"><input type="date" aria-label="Filter completed donations by date" /><select><option>All statuses</option><option>Completed</option><option>Distributed</option></select><select><option>All categories</option><option>Cooked Meals</option><option>Fruits</option></select><input placeholder="Search donor or location" /></div><div class="content-panel history-panel"><table><thead><tr><th>Food</th><th>Donor</th><th>Quantity</th><th>Collected</th><th>Servings</th><th>Distribution</th><th>Status</th></tr></thead><tbody>${ngoCompleted.map((row) => `<tr><td><strong>${row.food}</strong></td><td>${row.donor}</td><td>${row.quantity}</td><td>${row.date}</td><td>${row.servings}</td><td>${row.location}</td><td><span class="status-badge completed">Completed</span></td></tr>`).join('')}</tbody></table></div>`);
}

function ngoNotificationsPage(currentUser) { return ngoWorkspacePage(currentUser, 'Notifications', 'Stay coordinated', `<div class="workspace-intro"><div><span class="eyebrow">Notification center</span><h2>Updates for your operations team.</h2><p>Stay ahead of new food, donor decisions, pickup reminders, and distribution milestones.</p></div><button class="btn btn-secondary" type="button">Mark all as read</button></div><div class="notification-list">${ngoNotifications.map((item) => `<article class="notification-item ${item.unread ? 'unread' : ''}"><span class="notification-dot"></span><div><strong>${item.title}</strong><p>${item.detail}</p><small>${item.time}</small></div></article>`).join('')}</div>`); }

function ngoImpactPage(currentUser) { return ngoWorkspacePage(currentUser, 'NGO Impact', 'Community reach', `<div class="workspace-intro"><div><span class="eyebrow">Impact dashboard</span><h2>Turn collections into measurable reach.</h2><p>Track the food your organization has moved from surplus into community programs.</p></div></div><div class="impact-grid ngo-impact-grid"><div class="impact-big"><span>Total meals served</span><strong>1,280</strong><small>Across 19 successful collections</small></div><div class="summary-card"><span>Food collected</span><strong>486 kg</strong><small>Redistributed to programs</small></div><div class="summary-card"><span>People reached</span><strong>1,060</strong><small>Estimated beneficiaries</small></div><div class="summary-card"><span>Waste prevented</span><strong>486 kg</strong><small>Food kept in use</small></div></div><div class="content-panel chart-panel"><div class="panel-top"><div><span class="eyebrow">Donations over time</span><h3>Reliable collections for reliable programs</h3></div><select><option>2026</option><option>2025</option></select></div><div class="impact-bars"><div style="height:44%"><span>3</span><label>Jan</label></div><div style="height:70%"><span>6</span><label>Feb</label></div><div style="height:56%"><span>4</span><label>Mar</label></div><div style="height:86%"><span>8</span><label>Apr</label></div><div style="height:74%"><span>7</span><label>May</label></div><div style="height:96%"><span>10</span><label>Jun</label></div></div></div>`); }

function ngoProfilePage(currentUser) { const name = currentUser.name || 'Registered NGO'; return ngoWorkspacePage(currentUser, 'NGO Profile', 'Organization details', `<div class="workspace-intro"><div><span class="eyebrow">Trust profile</span><h2>Make your organization easy to trust.</h2><p>Donors see this information when evaluating your requests.</p></div><span class="verified-badge">✓ Verified NGO</span></div><div class="profile-layout"><div class="profile-card"><div class="profile-avatar">${name.charAt(0).toUpperCase()}</div><h3>${name}</h3><span class="verified">Verified NGO</span><p>Community food redistribution partner</p></div><form class="content-panel profile-form"><h3>Organization and service area</h3><div class="field-row two-col"><label>NGO name<input name="ngoName" value="${name}" /></label><label>Registration / NGO ID<input value="${currentUser.ngoId || 'NGO-FS-2026-0148'}" /></label></div><div class="field-row two-col"><label>Contact person<input value="${currentUser.contactPerson || ''}" placeholder="Operations contact" /></label><label>Email<input type="email" value="${currentUser.email}" /></label></div><div class="field-row two-col"><label>Phone<input value="${currentUser.phone || ''}" /></label><label>City<input value="${currentUser.location || ''}" /></label></div><div class="field-row"><label>Areas served<input placeholder="Downtown, Mission, SoMa" /></label></div><div class="field-row three-col"><label>Max pickup distance<input value="10 km" /></label><label>Daily capacity<input value="250 servings" /></label><label>Beneficiary capacity<input value="180 people" /></label></div><div class="field-row"><label>Organization description<textarea rows="4" placeholder="Describe the communities and programs you serve."></textarea></label></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save Profile</button></div></form></div>`); }

function ngoSettingsPage(currentUser) { return ngoWorkspacePage(currentUser, 'Settings', 'Organization preferences', `<div class="workspace-intro"><div><span class="eyebrow">Operations settings</span><h2>Configure your matching preferences.</h2><p>These values will guide future distance, capacity, and food-category recommendations.</p></div><button class="btn btn-primary" type="button">Save Settings</button></div><div class="settings-layout"><div class="content-panel settings-section"><h3>Service preferences</h3><label class="field-row">Preferred food categories<select><option>All categories</option><option>Cooked meals and rice</option><option>Fresh produce</option></select></label><label class="field-row">Preferred pickup timings<select><option>Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label><label class="field-row">Current capacity<input value="180 servings available today" /></label></div><div class="content-panel settings-section"><h3>Notifications and privacy</h3>${['New nearby donation alerts','Request decisions','Pickup reminders','Distribution milestones'].map((setting) => `<label class="setting-row"><span><strong>${setting}</strong><small>Keep your operations team informed</small></span><input type="checkbox" checked /></label>`).join('')}<a class="text-link" href="/ngo/report-issue">Report an issue</a></div></div>`); }

function ngoReportIssuePage(currentUser) { return ngoWorkspacePage(currentUser, 'Report an Issue', 'Support and safety', `<div class="workspace-intro"><div><span class="eyebrow">Contact admin</span><h2>Flag a concern quickly.</h2><p>Report unsafe food, pickup problems, incorrect information, or misuse for admin review.</p></div></div><form class="content-panel issue-form"><div class="field-row two-col"><label>Issue category<select><option>Unsafe food</option><option>Incorrect food information</option><option>Donor did not provide food</option><option>Donor cancellation</option><option>Pickup problem</option><option>Incorrect location</option><option>Misuse</option><option>Other</option></select></label><label>Donation ID<input placeholder="e.g. #FD-181" /></label></div><div class="field-row"><label>Description<textarea rows="7" placeholder="Describe what happened and what support you need."></textarea></label></div><label class="upload-zone compact-upload"><input type="file" accept="image/*" /><span class="upload-icon">+</span><strong>Add an optional image</strong><small>Images support the admin review; they do not prove food safety.</small></label><div class="form-actions"><a class="btn btn-secondary" href="/ngo/dashboard">Cancel</a><button class="btn btn-primary" type="submit">Submit Report</button></div></form>`); }

function adminDashboard(currentUser) {
  if (!currentUser || currentUser.role !== 'admin') return currentUser?.role === 'donor' ? donorDashboard(currentUser) : loginPage();
  return `
    ${dashboardShell('Admin Dashboard', 'Platform management', currentUser, `
      <div class="dashboard-grid seven-up">
        <div class="summary-card"><span>Total Users</span><strong>1,420</strong></div>
        <div class="summary-card"><span>Total Donors</span><strong>840</strong></div>
        <div class="summary-card"><span>Total NGOs</span><strong>48</strong></div>
        <div class="summary-card"><span>Active Donations</span><strong>34</strong></div>
        <div class="summary-card"><span>Completed Donations</span><strong>290</strong></div>
        <div class="summary-card"><span>Meals Saved</span><strong>12.4K</strong></div>
        <div class="summary-card"><span>Food Waste Reduced</span><strong>68%</strong></div>
      </div>
      <div class="analytics-layout">
        <div class="content-panel">
          <div class="panel-top"><h3>Platform activity</h3></div>
          <div class="chart-bars">
            <div class="bar-group"><span class="bar" style="height:55%"></span><label>Jan</label></div>
            <div class="bar-group"><span class="bar" style="height:65%"></span><label>Feb</label></div>
            <div class="bar-group"><span class="bar" style="height:75%"></span><label>Mar</label></div>
            <div class="bar-group"><span class="bar" style="height:85%"></span><label>Apr</label></div>
            <div class="bar-group"><span class="bar" style="height:90%"></span><label>May</label></div>
            <div class="bar-group"><span class="bar" style="height:95%"></span><label>Jun</label></div>
          </div>
        </div>
        <div class="content-panel">
          <div class="panel-top"><h3>Recent reports</h3></div>
          <ul class="report-list">
            <li>NGO verification queue: 12 pending</li>
            <li>3 donation disputes under review</li>
            <li>2 donor accounts flagged for review</li>
            <li>Platform impact report updated</li>
          </ul>
        </div>
      </div>
    `)}
  `;
}

window.addEventListener('popstate', render);
window.addEventListener('DOMContentLoaded', render);

window.addEventListener('click', (event) => {
  const anchor = event.target.closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('#')) return;
  event.preventDefault();
  navigateTo(href);
});

render();
