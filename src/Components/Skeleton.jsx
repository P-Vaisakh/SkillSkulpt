import React from 'react'

const Skeleton = () => {
  return (
    <div className="card bg-white shadow rounded-lg py-4 px-5 max-w-sm">
      <div className="animate-pulse flex flex-col gap-4">
        <div className="h-2 bg-slate-500 rounded w-28"></div>
        <div className="h-2 bg-slate-500 rounded w-full"></div>
        <div className="h-2 bg-slate-500 rounded w-full"></div>
        <div className="h-2 bg-slate-500 rounded w-full"></div>
        <div className="flex items-center justify-start gap-2">
          <div className="h-6 rounded-full bg-slate-500  w-6"> </div>
          <div className="h-2 bg-slate-500 rounded w-28"></div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton