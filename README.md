# Restaurant Order Scheduler

A modern React/Tailwind web application that implements the **Shortest Job First (SJF)** scheduling algorithm for restaurant order management.

🚀 **[Live Demo on GitHub Pages](https://balabm.github.io/Restaurantt3st/)**

## Features

- 🎨 **Glassmorphism Design**: Beautiful UI with soft shadows, backdrop blur effects, and gradient backgrounds
- 📋 **Menu Categories**: Organized menu with Hot Drinks, Cold Drinks, and Rice dishes
- ⏱️ **Preparation Times**: Each item displays its preparation time (e.g., Tea: 2m, Biriyani: 25m)
- 🔄 **SJF Algorithm**: Automatically schedules orders by shortest preparation time first
- 📊 **Dynamic Gantt Chart**: Visual timeline showing order scheduling with color-coded bars
- 📈 **Statistics Dashboard**: 
  - Average Waiting Time
  - Average Turnaround Time
  - Throughput metrics
- 📋 **Results Table**: Detailed breakdown showing Order #, Item, Category, Prep Time, Waiting Time, and Turnaround Time
- 🎯 **Interactive UI**: 
  - Click menu items to select orders
  - "Place Order" button to schedule
  - "Restart" button to reset
- 📱 **Responsive Layout**: Works seamlessly on all device sizes
- 🎨 **Lucide Icons**: Modern icons throughout the interface

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS framework
- **lucide-react**: Beautiful icon library

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Production Build

Build the application for production:
```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment

This application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Live URL**: https://balabm.github.io/Restaurantt3st/

### Deployment Workflow

The deployment uses GitHub Actions:
1. Builds the application using Vite
2. Uploads the build artifacts to GitHub Pages
3. Deploys to the GitHub Pages environment

See `.github/workflows/deploy.yml` for the deployment configuration.

### Initial Setup Required ⚠️

**Important**: For the deployment to work, GitHub Pages must be configured:

1. Go to **Settings** → **Pages** in your GitHub repository
2. Under **Build and deployment**:
   - Set **Source** to **"GitHub Actions"**
   - Save the settings
3. Push a commit or re-run the workflow to deploy

For detailed setup instructions, see [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md).

### Troubleshooting

If you see a blank page after deployment:
- Verify GitHub Pages is enabled with "GitHub Actions" as the source
- Check that the workflow completed successfully in the Actions tab
- Clear browser cache and reload (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console (F12) for any errors

## How It Works

The application implements the **Shortest Job First (SJF)** scheduling algorithm:

1. Select items from the menu (Hot Drinks, Cold Drinks, or Rice)
2. Click "Place Order" to schedule your selections
3. The SJF algorithm sorts orders by shortest preparation time
4. View the results:
   - Gantt chart showing the execution timeline
   - Statistics showing efficiency metrics
   - Detailed table with waiting and turnaround times
5. Click "Restart" to start over

## Example

If you order:
- Biriyani (25m)
- Tea (2m)
- Fried Rice (15m)

The SJF algorithm will schedule them as:
1. Tea (2m) - starts at 0m, ends at 2m
2. Fried Rice (15m) - starts at 2m, ends at 17m
3. Biriyani (25m) - starts at 17m, ends at 42m

This minimizes the average waiting time for all orders!
