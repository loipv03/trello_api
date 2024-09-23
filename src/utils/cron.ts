import User from "../model/user";

const cronSchedule = async () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        const result = await User.deleteMany({ isActive: false, createdAt: { $lt: oneDayAgo } });
        console.log(`Đã xóa ${result.deletedCount} user chưa activate sau 1 ngày.`);
    } catch (error) {
        console.error('Error deleting inactive users:', error);
    }
}

export default cronSchedule