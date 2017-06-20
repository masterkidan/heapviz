import * as React from 'react';
import './StatsWindow.pcss';
import Stats from '../Stats';
import * as filesize from 'filesize';

interface StatsWindowProps {
    stats: any;
}

export const StatsWindow = ({ stats }: StatsWindowProps) => {
    const renderStats = stats.totals;
    renderStats["Number of samples"] = stats.samples.length
    return (
        <div className="StatsWindow">
            <Stats stats={renderStats} />
        </div>
    )
};

export default StatsWindow;