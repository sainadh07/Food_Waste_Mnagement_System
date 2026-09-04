import { useMemo, useState } from 'react';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const demoAccounts = {
  donor: {
    id: 'donor-01',
    role: 'donor',
    name: 'Aisha Rahman',
    email: 'donor@foodshare.com',
    phone: '+1 (415) 555-0124',
    donorType: 'Restaurant',
  },
  ngo: {
    id: 'ngo-01',
    role: 'ngo',
    name: 'Hope Food Collective',
    email: 'ngo@foodshare.com',
    phone: '+1 (415) 555-0198',
    location: 'Downtown District',
  },
  admin: {
    id: 'admin-01',
    role: 'admin',
    name: 'Platform Administrator',
    email: 'admin@foodshare.com',
    phone: '+1 (415) 555-0111',
  },
};

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Impact', to: '/impact' },
  { label: 'Contact Us', to: '/contact' },
];

const donorDonations = [
  { id: '#DS-2048', item: 'Fresh Sandwiches', quantity: '48 boxes', status: 'Accepted', date: 'Today' },
  { id: '#DS-2051', item: 'Vegetable Rice', quantity: '30 trays', status: 'Pending', date: '2 days ago' },
  { id: '#DS-2057', item: 'Fruit Packs', quantity: '80 packs', status: 'Completed', date: '5 days ago' },
];

const ngoListings = [
  { id: '#FD-181', title: 'Fresh breakfast trays', donor: 'Harbor Bistro', pickup: '2.4 km away', time: '6:30 PM', qty: '36 meals' },
  { id: '#FD-182', title: 'Cooked rice and curries', donor: 'Sunrise Hostel', pickup: '3.1 km away', time: '7:15 PM', qty: '24 meals' },
  { id: '#FD-185', title: 'Fruit packs and salads', donor: 'City Center Hotel', pickup: '4.7 km away', time: '8:00 PM', qty: '50 meals' },
];

const impactStats = [
  { label: 'Meals Saved', value: '12.4K', note: 'Sample data' },
  { label: 'Food Donations', value: '1,860', note: 'Sample data' },
  { label: 'Active Donors', value: '430', note: 'Sample data' },
  { label: 'Partner NGOs', value: '48', note: 'Sample data' },
  { label: 'Food Waste Reduced', value: '68%', note: 'Sample data' },
];

const trustPoints = [
  'Verified NGO partner network',
  'Transparent donation details',
  'Pickup coordination and tracking',
  'User reporting and admin oversight',
  'Clear food information sharing',
];

const faqItems = [
  { question: 'Who can donate food?', answer: 'Anyone with surplus food can register as a donor, including homes, restaurants, hotels, schools, and event organizers.' },
  { question: 'How do NGOs receive donations?', answer: 'NGOs can review nearby donation listings and request or accept suitable food pickups from the platform.' },
  { question: 'How is the platform managed?', answer: 'Admins monitor accounts, donation activity, and user reports to maintain trust throughout the system.' },
];

function storageKey() {
  return 'foodshare_current_user';
}

function readStoredUser() {
  const data = localStorage.getItem(storageKey());
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => readStoredUser());

  const userRole = currentUser?.role ?? null;

  const handleLogout = () => {
    localStorage.removeItem(storageKey());
    setCurrentUser(null);
  };

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<PublicLayout currentUser={currentUser} onLogout={handleLogout} />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="impact" element={<ImpactPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/donor/dashboard" element={<ProtectedRoute currentUser={currentUser} allowedRole="donor"><DonorDashboard user={currentUser} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/ngo/dashboard" element={<ProtectedRoute currentUser={currentUser} allowedRole="ngo"><NGODashboard user={currentUser} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute currentUser={currentUser} allowedRole="admin"><AdminDashboard user={currentUser} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function PublicLayout({ currentUser, onLogout }) {
  const location = useLocation();

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      <header className="topbar">
        <div className="container nav-wrap">
          <NavLink to="/" className="brand" aria-label="FoodShare home">
            <span className="brand-mark">FS</span>
            <span>FoodShare</span>
          </NavLink>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            {currentUser ? (
              <>
                <NavLink to={currentUser.role === 'donor' ? '/donor/dashboard' : currentUser.role === 'ngo' ? '/ngo/dashboard' : '/admin/dashboard'} className="btn btn-secondary btn-small">
                  Dashboard
                </NavLink>
                <button className="btn btn-primary btn-small" type="button" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                {!isAuthPage && <NavLink to="/login" className="btn btn-secondary btn-small">Sign In</NavLink>}
                <NavLink to="/register" className="btn btn-primary btn-small">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

function Outlet() {
  return null;
}

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">Food waste reduction platform</span>
            <h1>Turn Surplus Food Into Meaningful Impact.</h1>
            <p>
              Connect surplus food with trusted NGOs and help reduce food waste while feeding communities in need.
            </p>

            <div className="hero-actions">
              <NavLink to="/register" className="btn btn-primary">
                Donate Food
              </NavLink>
              <NavLink to="/register" className="btn btn-secondary">
                Join as NGO
              </NavLink>
            </div>

            <div className="trust-row">
              <span>✔ Verified partners</span>
              <span>✔ Local coordination</span>
              <span>✔ Community impact</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card main-card">
              <div className="mini-badge">+ 2,480 meals saved</div>
              <div className="food-visual">
                <div className="plate"></div>
                <div className="leaf leaf-one"></div>
                <div className="leaf leaf-two"></div>
              </div>
            </div>
            <div className="floating-card floating-top">
              <strong>48</strong>
              <span>Partner NGOs</span>
            </div>
            <div className="floating-card floating-bottom">
              <strong>68%</strong>
              <span>Waste reduced</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section problem-section">
        <div className="container split-panel">
          <div className="panel-visual">
            <div className="photo-panel">
              <div className="photo-glow"></div>
            </div>
          </div>

          <div className="panel-copy">
            <span className="eyebrow accent">The problem</span>
            <h2>Too Much Food Is Wasted. Too Many People Go Hungry.</h2>
            <p>
              Large amounts of safe surplus food can go to waste from households, restaurants, hostels, events,
              institutions, and organizations while many people still lack sufficient food. FoodShare creates a
              practical bridge between donors and local NGOs to redirect this surplus toward community needs.
            </p>
          </div>
        </div>
      </section>

      <section className="section steps-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow accent">How it works</span>
            <h2>Simple steps with a real impact</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="icon-wrap green">1</div>
              <h3>Donate</h3>
              <p>Donors post available surplus food with details on quantity, timing, and pickup location.</p>
            </div>
            <div className="step-card">
              <div className="icon-wrap green">2</div>
              <h3>Connect</h3>
              <p>Nearby NGOs discover suitable food donations and respond to relevant requests.</p>
            </div>
            <div className="step-card">
              <div className="icon-wrap green">3</div>
              <h3>Collect</h3>
              <p>NGOs accept the donation and arrange collection with the donor using transparent coordination.</p>
            </div>
            <div className="step-card">
              <div className="icon-wrap green">4</div>
              <h3>Serve</h3>
              <p>Meals are distributed to people in need through trusted local community channels.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section roles-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow accent">Our ecosystem</span>
            <h2>Built around the three roles that drive impact</h2>
          </div>

          <div className="role-grid">
            <div className="role-card">
              <div className="role-icon">🤝</div>
              <h3>Donors</h3>
              <p>Share your surplus food and help prevent perfectly usable food from going to waste.</p>
            </div>
            <div className="role-card">
              <div className="role-icon">🏘️</div>
              <h3>NGOs</h3>
              <p>Connect with nearby food donors and help distribute surplus food to communities in need.</p>
            </div>
            <div className="role-card">
              <div className="role-icon">🛡️</div>
              <h3>Admin</h3>
              <p>Monitor, manage, verify, and maintain a trusted food donation ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section impact-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow accent">Impact</span>
            <h2>Measurable difference for people and communities</h2>
          </div>

          <div className="stats-grid">
            {impactStats.map((item) => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small>{item.note}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container trust-grid">
          <div>
            <span className="eyebrow accent">Trust & safety</span>
            <h2>A safer and more trustworthy donation ecosystem</h2>
          </div>

          <div className="trust-list">
            {trustPoints.map((point) => (
              <div key={point} className="trust-item">
                <span className="check">✓</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <div className="page-shell">
      <div className="container narrow-page">
        <span className="eyebrow accent">About us</span>
        <h1>Reducing waste, strengthening communities.</h1>
        <p>
          FoodShare was created to address a simple but urgent challenge: safe surplus food is often discarded even
          when it could nourish someone in need. Our mission is to connect donors with trusted NGOs so surplus food
          can be redistributed efficiently and responsibly.
        </p>

        <div className="info-block">
          <h3>Why this matters</h3>
          <p>
            Households, restaurants, hotels, event organizers, hostels, and institutions often have food left over at
            the end of the day. Without a connected system, this food can end up in waste streams while many people
            remain food insecure.
          </p>
        </div>

        <div className="info-block">
          <h3>Our mission</h3>
          <p>
            “Our mission is to create a connected ecosystem where surplus food can reach people who need it instead
            of becoming waste.”
          </p>
        </div>

        <div className="info-block">
          <h3>How we work together</h3>
          <p>
            Donors upload food details, NGOs review nearby opportunities, and the platform streamlines collection and
            distribution through a transparent, community-centered workflow.
          </p>
        </div>
      </div>
    </div>
  );
}

function HowItWorksPage() {
  return (
    <div className="page-shell">
      <div className="container narrow-page">
        <span className="eyebrow accent">How it works</span>
        <h1>A clear process for donors, NGOs, and admins.</h1>

        <div className="timeline-block">
          <h3>For Donors</h3>
          <ol>
            <li>Register and choose the Donor account type.</li>
            <li>Create a donation listing with food details and pickup information.</li>
            <li>Add quantity, preparation time, and safe consumption details.</li>
            <li>Wait for NGO requests or accepted collection offers.</li>
            <li>Confirm handover and track the donation status.</li>
          </ol>
        </div>

        <div className="timeline-block">
          <h3>For NGOs</h3>
          <ol>
            <li>Register and complete the verification process.</li>
            <li>Discover nearby donation opportunities.</li>
            <li>Request or accept suitable donations.</li>
            <li>Collect food and arrange logistics.</li>
            <li>Distribute meals and update donation status.</li>
          </ol>
        </div>

        <div className="timeline-block">
          <h3>For Admin</h3>
          <ol>
            <li>Verify users and organizations.</li>
            <li>Monitor active and completed donations.</li>
            <li>Manage user accounts and reports.</li>
            <li>Track platform activity and impact.</li>
            <li>Analyze network health and system performance.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function ImpactPage() {
  return (
    <div className="page-shell">
      <div className="container">
        <div className="section-heading center">
          <span className="eyebrow accent">Impact dashboard</span>
          <h1>Sample impact indicators</h1>
        </div>

        <div className="stats-grid impact-grid">
          {impactStats.map((item) => (
            <div key={item.label} className="stat-card large">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <small>{item.note}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page-shell">
      <div className="container contact-layout">
        <div className="contact-copy">
          <span className="eyebrow accent">Contact us</span>
          <h1>We’d love to hear from you.</h1>
          <p>Whether you’re a donor, an NGO, or a community partner, we’re here to help build a more sustainable food ecosystem.</p>

          <div className="contact-details">
            <div><strong>Email:</strong> hello@foodshare.org</div>
            <div><strong>Phone:</strong> +1 (415) 555-0148</div>
            <div><strong>Location:</strong> 14 Greenway Avenue, San Francisco, CA</div>
          </div>

          <div className="faq-box">
            <h3>Support</h3>
            {faqItems.map((item) => (
              <div key={item.question} className="faq-item">
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <form className="form-card contact-form">
          <div className="field-row">
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
          </div>

          <div className="field-row">
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
          </div>

          <div className="field-row">
            <label>
              Subject
              <input type="text" placeholder="How can we help?" />
            </label>
          </div>

          <div className="field-row">
            <label>
              Message
              <textarea rows="5" placeholder="Write your message here" />
            </label>
          </div>

          <button type="button" className="btn btn-primary full-width">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState('donor');
  const navigate = useNavigate();

  const handleRegistration = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow accent">Register</span>
          <h1>Create your account</h1>
        </div>

        <div className="role-toggle">
          <button type="button" className={selectedRole === 'donor' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setSelectedRole('donor')}>
            Donor
          </button>
          <button type="button" className={selectedRole === 'ngo' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setSelectedRole('ngo')}>
            NGO
          </button>
        </div>

        <form onSubmit={handleRegistration} className="form-card inner-form">
          {selectedRole === 'donor' ? (
            <>
              <div className="field-row two-col">
                <label>
                  Full Name
                  <input type="text" placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input type="email" placeholder="you@example.com" required />
                </label>
              </div>

              <div className="field-row two-col">
                <label>
                  Phone Number
                  <input type="tel" placeholder="+1 555 000 0000" required />
                </label>
                <label>
                  Donor Type
                  <select defaultValue="Restaurant">
                    <option>Individual</option>
                    <option>Restaurant</option>
                    <option>Hotel</option>
                    <option>Hostel</option>
                    <option>Event Organizer</option>
                    <option>Organization</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <div className="field-row two-col">
                <label>
                  Password
                  <input type="password" placeholder="Password" required />
                </label>
                <label>
                  Confirm Password
                  <input type="password" placeholder="Confirm password" required />
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="field-row two-col">
                <label>
                  NGO Name
                  <input type="text" placeholder="Organization name" required />
                </label>
                <label>
                  Contact Person
                  <input type="text" placeholder="Name" required />
                </label>
              </div>

              <div className="field-row two-col">
                <label>
                  Email
                  <input type="email" placeholder="hello@ngo.org" required />
                </label>
                <label>
                  Phone Number
                  <input type="tel" placeholder="+1 555 000 0000" required />
                </label>
              </div>

              <div className="field-row two-col">
                <label>
                  Location
                  <input type="text" placeholder="City or region" required />
                </label>
                <label>
                  Address
                  <input type="text" placeholder="Street address" required />
                </label>
              </div>

              <div className="field-row two-col">
                <label>
                  Password
                  <input type="password" placeholder="Password" required />
                </label>
                <label>
                  Confirm Password
                  <input type="password" placeholder="Confirm password" required />
                </label>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary full-width">
            Create Account
          </button>

          <p className="auth-switch">
            Already have an account? <NavLink to="/login">Sign In</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

function LoginPage({ setCurrentUser }) {
  const [selectedRole, setSelectedRole] = useState('donor');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    if (!email || !password) return;

    const roleMap = {
      donor: demoAccounts.donor,
      ngo: demoAccounts.ngo,
      admin: demoAccounts.admin,
    };

    const user = roleMap[selectedRole];
    const userToStore = {
      ...user,
      email: email || user.email,
    };

    localStorage.setItem(storageKey(), JSON.stringify(userToStore));
    setCurrentUser(userToStore);

    if (selectedRole === 'donor') navigate('/donor/dashboard');
    if (selectedRole === 'ngo') navigate('/ngo/dashboard');
    if (selectedRole === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow accent">Welcome back</span>
          <h1>Sign in</h1>
        </div>

        <div className="role-toggle">
          <button type="button" className={selectedRole === 'donor' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setSelectedRole('donor')}>
            Donor
          </button>
          <button type="button" className={selectedRole === 'ngo' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setSelectedRole('ngo')}>
            NGO
          </button>
          <button type="button" className={selectedRole === 'admin' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setSelectedRole('admin')}>
            Admin
          </button>
        </div>

        <form className="form-card inner-form" onSubmit={handleLogin}>
          <div className="field-row">
            <label>
              Email
              <input type="email" name="email" placeholder={demoAccounts[selectedRole].email} required />
            </label>
          </div>

          <div className="field-row">
            <label>
              Password
              <input type="password" name="password" placeholder="password123" required />
            </label>
          </div>

          <div className="field-row compact-row">
            <label className="checkbox-row">
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="/login">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary full-width">
            Sign In
          </button>

          <p className="auth-switch">
            Don’t have an account? <NavLink to="/register">Register</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

function ProtectedRoute({ currentUser, allowedRole, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== allowedRole) {
    const redirectTarget = currentUser.role === 'donor' ? '/donor/dashboard' : currentUser.role === 'ngo' ? '/ngo/dashboard' : '/admin/dashboard';
    return <Navigate to={redirectTarget} replace />;
  }

  return children;
}

function DashboardLayout({ title, subtitle, children, user, onLogout }) {
  const navItems = {
    donor: [
      { label: 'Dashboard', path: '/donor/dashboard' },
      { label: 'Create Donation', path: '/donor/dashboard' },
      { label: 'My Donations', path: '/donor/dashboard' },
      { label: 'Donation Requests', path: '/donor/dashboard' },
      { label: 'Notifications', path: '/donor/dashboard' },
      { label: 'Profile', path: '/donor/dashboard' },
      { label: 'Settings', path: '/donor/dashboard' },
      { label: 'Logout', path: '/' },
    ],
    ngo: [
      { label: 'Dashboard', path: '/ngo/dashboard' },
      { label: 'Nearby Donations', path: '/ngo/dashboard' },
      { label: 'My Requests', path: '/ngo/dashboard' },
      { label: 'Active Collections', path: '/ngo/dashboard' },
      { label: 'Completed Donations', path: '/ngo/dashboard' },
      { label: 'Notifications', path: '/ngo/dashboard' },
      { label: 'Profile', path: '/ngo/dashboard' },
      { label: 'Settings', path: '/ngo/dashboard' },
      { label: 'Logout', path: '/' },
    ],
    admin: [
      { label: 'Dashboard', path: '/admin/dashboard' },
      { label: 'Donors', path: '/admin/dashboard' },
      { label: 'NGOs', path: '/admin/dashboard' },
      { label: 'Donations', path: '/admin/dashboard' },
      { label: 'Users', path: '/admin/dashboard' },
      { label: 'Reports', path: '/admin/dashboard' },
      { label: 'Notifications', path: '/admin/dashboard' },
      { label: 'Analytics', path: '/admin/dashboard' },
      { label: 'Settings', path: '/admin/dashboard' },
      { label: 'Logout', path: '/' },
    ],
  };

  const links = navItems[user.role];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="brand sidebar-brand">
          <span className="brand-mark">FS</span>
          <span>FoodShare</span>
        </div>

        <ul className="sidebar-menu">
          {links.map((item) => (
            <li key={item.label}>
              {item.label === 'Logout' ? (
                <button type="button" className="sidebar-link danger-link" onClick={onLogout}>
                  {item.label}
                </button>
              ) : (
                <a href={item.path} className="sidebar-link">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="eyebrow accent">{subtitle}</span>
            <h1>{title}</h1>
          </div>
          <div className="dashboard-user">
            <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.role === 'donor' ? 'Donor account' : user.role === 'ngo' ? 'NGO account' : 'Admin account'}</small>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

function DonorDashboard({ user, onLogout }) {
  return (
    <DashboardLayout title="Donor Dashboard" subtitle="Overview" user={user} onLogout={onLogout}>
      <div className="dashboard-grid four-up">
        <div className="summary-card">
          <span>Active Donations</span>
          <strong>08</strong>
        </div>
        <div className="summary-card">
          <span>Pending Requests</span>
          <strong>03</strong>
        </div>
        <div className="summary-card">
          <span>Completed Donations</span>
          <strong>27</strong>
        </div>
        <div className="summary-card">
          <span>Total Food Donated</span>
          <strong>320 kg</strong>
        </div>
      </div>

      <div className="content-panel">
        <div className="panel-top">
          <h3>Recent donations</h3>
          <button className="btn btn-secondary btn-small" type="button">Create Donation</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donorDonations.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.item}</td>
                <td>{row.quantity}</td>
                <td><span className={`status-badge ${row.status.toLowerCase()}`}>{row.status}</span></td>
                <td>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

function NGODashboard({ user, onLogout }) {
  return (
    <DashboardLayout title="NGO Dashboard" subtitle="Operations" user={user} onLogout={onLogout}>
      <div className="dashboard-grid five-up">
        <div className="summary-card">
          <span>Nearby Donations</span>
          <strong>24</strong>
        </div>
        <div className="summary-card">
          <span>Pending Requests</span>
          <strong>06</strong>
        </div>
        <div className="summary-card">
          <span>Active Collections</span>
          <strong>04</strong>
        </div>
        <div className="summary-card">
          <span>Completed Donations</span>
          <strong>19</strong>
        </div>
        <div className="summary-card">
          <span>Meals Served</span>
          <strong>1,280</strong>
        </div>
      </div>

      <div className="content-panel">
        <div className="panel-top">
          <h3>Available nearby donations</h3>
          <button className="btn btn-secondary btn-small" type="button">Filter</button>
        </div>

        <div className="listing-grid">
          {ngoListings.map((item) => (
            <div key={item.id} className="listing-card">
              <div className="listing-head">
                <span className="listing-tag">{item.id}</span>
                <span className="listing-time">{item.time}</span>
              </div>
              <h4>{item.title}</h4>
              <p><strong>Donor:</strong> {item.donor}</p>
              <p><strong>Pickup:</strong> {item.pickup}</p>
              <p><strong>Quantity:</strong> {item.qty}</p>
              <button className="btn btn-primary btn-small" type="button">Request Donation</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function AdminDashboard({ user, onLogout }) {
  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Platform management" user={user} onLogout={onLogout}>
      <div className="dashboard-grid seven-up">
        <div className="summary-card">
          <span>Total Users</span>
          <strong>1,420</strong>
        </div>
        <div className="summary-card">
          <span>Total Donors</span>
          <strong>840</strong>
        </div>
        <div className="summary-card">
          <span>Total NGOs</span>
          <strong>48</strong>
        </div>
        <div className="summary-card">
          <span>Active Donations</span>
          <strong>34</strong>
        </div>
        <div className="summary-card">
          <span>Completed Donations</span>
          <strong>290</strong>
        </div>
        <div className="summary-card">
          <span>Meals Saved</span>
          <strong>12.4K</strong>
        </div>
        <div className="summary-card">
          <span>Food Waste Reduced</span>
          <strong>68%</strong>
        </div>
      </div>

      <div className="analytics-layout">
        <div className="content-panel">
          <div className="panel-top">
            <h3>Platform activity</h3>
          </div>
          <div className="chart-bars" aria-label="Sample analytics chart">
            <div className="bar-group"><span className="bar" style={{ height: '55%' }}></span><label>Jan</label></div>
            <div className="bar-group"><span className="bar" style={{ height: '65%' }}></span><label>Feb</label></div>
            <div className="bar-group"><span className="bar" style={{ height: '75%' }}></span><label>Mar</label></div>
            <div className="bar-group"><span className="bar" style={{ height: '85%' }}></span><label>Apr</label></div>
            <div className="bar-group"><span className="bar" style={{ height: '90%' }}></span><label>May</label></div>
            <div className="bar-group"><span className="bar" style={{ height: '95%' }}></span><label>Jun</label></div>
          </div>
        </div>

        <div className="content-panel">
          <div className="panel-top">
            <h3>Recent reports</h3>
          </div>
          <ul className="report-list">
            <li>NGO verification queue: 12 pending</li>
            <li>3 donation disputes under review</li>
            <li>2 donor accounts flagged for review</li>
            <li>Platform impact report updated</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">FS</span>
            <span>FoodShare</span>
          </div>
          <p>Connecting surplus food with trusted partners to reduce waste and strengthen communities.</p>
        </div>
        <div className="footer-links">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/how-it-works">How It Works</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </div>
    </footer>
  );
}

export default App;
