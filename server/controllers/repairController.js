import Repair from '../models/Repair.js';

export const getRepairs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || '';
        const status = req.query.status || 'All';

        let query = {};
        
        // Filter based on user role
        if (req.user && req.user.role === 'client') {
            query.customerId = req.user._id;
        } else if (req.user && req.user.role === 'vendor') {
             query.vendorId = req.user._id;
        }

        if (status && status !== 'All') {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { id: { $regex: search, $options: 'i' } },
                { device: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { model: { $regex: search, $options: 'i' } },
                { issue: { $regex: search, $options: 'i' } }
            ];
        }

        const count = await Repair.countDocuments(query);
        const repairs = await Repair.find(query)
            .limit(limit)
            .skip(limit * (page - 1))
            .sort({ createdAt: -1 });

        res.status(200).json({
            repairs,
            page,
            pages: Math.ceil(count / limit),
            total: count
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addRepair = async (req, res) => {
    const repairData = req.body;
    // Set customerId from authenticated user if available
    if (req.user && !repairData.customerId) {
        repairData.customerId = req.user._id;
    }

    try {
        const newRepair = new Repair(repairData);
        await newRepair.save();
        res.status(201).json(newRepair);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateRepairStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
        const updatedRepair = await Repair.findOneAndUpdate(
            { id: id }, // Using custom ID field
            { status: status, $push: { history: status } },
            { new: true }
        );
        res.status(200).json(updatedRepair);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteRepair = async (req, res) => {
    const { id } = req.params;
    try {
        await Repair.findOneAndDelete({ id: id }); // Using custom ID field
        res.json({ message: "Repair deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
