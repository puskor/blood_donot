import { UserPlus, Search, Droplet, Heart } from 'lucide-react';
import StatusCard from './card/StatusCard';
import { getTotalRequest } from '@/lib/action/get/request';
import { getAllDonor, getTotalDonor } from '@/lib/action/get/donate';


export default async function StatsAndProcess() {
  const reqRequest = await getTotalRequest();
  const totalRequest = reqRequest?.pagination?.totalRequests || 0;
   const reqDonor = await getTotalDonor();
  const totalDonor = reqDonor?.pagination?.totalDonors || 0;
  // console.log(totalDonor)


  const stats = [
    { value: `${totalDonor}+`, label: 'Happy Donors' },
    { value: '8,320+', label: 'Lives Saved' },
    { value: `${totalRequest}+`, label: 'Donation Requests' },
    { value: '150+', label: 'Volunteers' },
  ];

  const steps = [
    { id: 1, title: 'Register', desc: 'Create an account and complete your profile.', icon: UserPlus },
    { id: 2, title: 'Find Requests', desc: 'Browse donation requests near you.', icon: Search },
    { id: 3, title: 'Donate Blood', desc: 'Donate blood and make a difference.', icon: Droplet },
    { id: 4, title: 'Save Lives', desc: 'Your donation can save up to three lives.', icon: Heart },
  ];

  return (
    <section className="w-full bg-pink-100 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 max-w-5xl mx-auto">
          {stats.map((status, index) => (
            <StatusCard key={index} status={status} />
          ))}
        </div>

        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 font-poppins">
              How Blood Donation Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center text-center space-y-4 group">
                  <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6 text-rose-600 fill-none" />
                    <div className="absolute inset-0 bg-rose-100/40 rounded-full blur-md -z-10 scale-90" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-inter text-slate-900">
                      <span className="text-rose-600 font-extrabold mr-1">{step.id}</span>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed font-inter">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}